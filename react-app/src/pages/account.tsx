import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useAuth } from '@/lib/auth';

import Button from '@/components/buttons/Button';
import IPFSFileUpload from '@/components/form-controls/FileUpload';
import AppLayout from '@/components/layout/AppLayout';
import H1 from '@/components/text/H1';
import Subtitle from '@/components/text/Subtitle';

import PinataService from '../services/PinataService';

const PROFILE_QUERY = gql`
  query UserScreen {
    profileIndex(first: 30) {
      edges {
        node {
          version
          id
          name
          address
          category
          description
          headerImage
          logo
          slogan
          website
          city
          country
          email
          phone
          postalCode
          author {
            id
          }
        }
      }
    }
    viewer {
      id
    }
  }
`;

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      document {
        __typename
        id
        version
      }
    }
  }
`;

const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
      document {
        name
        address
        category
        description
        headerImage
        logo
        slogan
        website
        city
        country
        email
        phone
        postalCode
      }
    }
  }
`;

interface Content {
  name: string;
  address: string;
  category: string;
  description: string;
  headerImage: string;
  logo: string;
  slogan: string;
  website: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  postalCode: string;
}

interface ProfileType extends Content {
  id: string;
  version: string;
  __typename: string;
  author: string;
}

interface ProfileRecord {
  node: ProfileType;
}

export default function Account() {
  const cleanContent = {
    name: '',
    address: '',
    category: '',
    description: '',
    headerImage: '',
    logo: '',
    slogan: '',
    website: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    postalCode: '',
  };
  const cleanProfile = {
    ...cleanContent,
    id: '',
    version: '',
    __typename: '',
    author: '',
  };
  const [myProfile, setMyProfile] = useState(null);
  const [content, setContent] = useState(cleanContent);
  const [state] = useAuth();
  const profileQuery = useQuery(PROFILE_QUERY);
  const [createProfile, createProfileState] = useMutation(
    CREATE_PROFILE_MUTATION,
    {
      refetchQueries: ['UserScreen'],
    }
  );
  const [updateProfile, updateProfileState] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      refetchQueries: ['UserScreen'],
    }
  );

  const handleUpdate = () => {
    // @ts-ignore
    const { id, version } = myProfile.node;
    updateProfile({
      variables: { input: { id, content, options: { version } } },
    });
    alert('Profile updated');
  };

  const handleSave = () => {
    createProfile({ variables: { input: { content } } }).then(
      (res) => {
        setMyProfile(res.data?.createProfile?.document);
        alert('Profile saved');
      },
      (err) => {
        console.warn('Failed to create profile', err);
      }
    );
  };

  const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    myProfile ? handleUpdate() : handleSave();
  };

  // if (profileQuery.error) {
  //   console.log('profileQuery:', profileQuery);
  //   return <h1>Failed to load profile!</h1>;
  // }

  // if (profileQuery.loading) {
  //   return <h1>Loading profile...</h1>;
  // }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleImageChange = (name: string, cid: string) => {
    setContent({ ...content, [name]: cid });
  };

  useEffect(() => {
    if (
      !myProfile &&
      profileQuery.data?.profileIndex &&
      profileQuery.data?.viewer
    ) {
      setMyProfile(
        profileQuery.data?.profileIndex.edges.filter(
          // @ts-ignore
          (a) => a.node.author.id == profileQuery.data?.viewer.id
        )[0]
      );
    }
    // @ts-ignore
  }, [profileQuery.data, state.status]);

  useEffect(() => {
    // @ts-ignore
    if (myProfile?.node) {
      // @ts-ignore
      const { __typename, version, id, author, ...data } = myProfile.node;
      setContent(data);
    }
  }, [myProfile]);

  return (
    <AppLayout>
      <div className='flex justify-center'>
        <form className='space-y-8 divide-y divide-gray-200 py-12 md:w-2/3 lg:w-4/6'>
          <div>
            <H1>Account</H1>
            <Subtitle className='mt-1'>
              Here you can edit your account settings.
            </Subtitle>
          </div>
          <div className=' border-2 p-12'>
            <div className='space-y-8 divide-y divide-gray-200'>
              <div className=''>
                <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Display Name
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        autoComplete='given-name'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        // @ts-ignore
                        placeholder={myProfile?.node?.name || ''}
                        disabled={
                          updateProfileState.loading ||
                          createProfileState.loading
                        }
                        onChange={(e) => handleChange(e)}
                        name='name'
                        value={content.name}
                      />
                    </div>
                  </div>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='category'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Category
                    </label>
                    <select
                      name='category'
                      autoComplete='category-name'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      // @ts-ignore
                      placeholder={myProfile?.node?.category || ''}
                      disabled={
                        updateProfileState.loading || createProfileState.loading
                      }
                      onChange={(e) => handleChange(e)}
                      value={content.category}
                    >
                      <option>VEHICLES</option>
                      <option>ELECTRONICS</option>
                      <option>CLOTHES</option>
                    </select>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='website'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Brand site
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='website'
                        autoComplete='website'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        // @ts-ignore
                        placeholder={myProfile?.node?.website || ''}
                        disabled={
                          updateProfileState.loading ||
                          createProfileState.loading
                        }
                        onChange={(e) => handleChange(e)}
                        value={content.website}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='slogan'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Slogan
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='slogan'
                        autoComplete='slogan'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        // @ts-ignore
                        placeholder={myProfile?.node?.slogan || ''}
                        disabled={
                          updateProfileState.loading ||
                          createProfileState.loading
                        }
                        onChange={(e) => handleChange(e)}
                        value={content.slogan}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-6'>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium text-gray-700'
                    >
                      About
                    </label>
                    <div className='mt-1'>
                      <textarea
                        name='description'
                        rows={5}
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        // @ts-ignore
                        placeholder={myProfile?.node?.description || ''}
                        disabled={
                          updateProfileState.loading ||
                          createProfileState.loading
                        }
                        onChange={(e) => handleChange(e)}
                        value={content.description}
                      />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>
                      Give your customers an overview about your company.
                    </p>
                  </div>
                </div>
              </div>
              <div className='pt-1'>
                <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                  <IPFSFileUpload
                    name='Logo'
                    cid={content.logo}
                    handleImageChange={handleImageChange}
                  ></IPFSFileUpload>
                </div>
                <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                  <IPFSFileUpload
                    name='Header'
                    cid={content.headerImage}
                    handleImageChange={handleImageChange}
                  ></IPFSFileUpload>
                </div>
              </div>
              <div className='pt-5'>
                <div>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    Contact
                  </h3>
                </div>
                <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email
                    </label>
                    <div className='mt-1'>
                      <input
                        name='email'
                        type='email'
                        autoComplete='email'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        // @ts-ignore
                        placeholder={myProfile?.node?.email || ''}
                        disabled={
                          updateProfileState.loading ||
                          createProfileState.loading
                        }
                        onChange={(e) => handleChange(e)}
                        value={content.email}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Phone
                    </label>
                    <div className='mt-1'>
                      <input
                        name='phone'
                        type='text'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        // @ts-ignore
                        placeholder={myProfile?.node?.phone || ''}
                        disabled={
                          updateProfileState.loading ||
                          createProfileState.loading
                        }
                        onChange={(e) => handleChange(e)}
                        value={content.phone}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Country
                    </label>
                    <select
                      name='country'
                      autoComplete='country-name'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      // @ts-ignore
                      placeholder={myProfile?.node?.country || ''}
                      disabled={
                        updateProfileState.loading || createProfileState.loading
                      }
                      onChange={(e) => handleChange(e)}
                      value={content.country}
                    >
                      <option>United States</option>
                      <option>Germany</option>
                      <option>Portugal</option>
                    </select>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700'
                    >
                      City
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='city'
                        autoComplete='address-level1'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        // @ts-ignore
                        placeholder={myProfile?.node?.city || ''}
                        disabled={
                          updateProfileState.loading ||
                          createProfileState.loading
                        }
                        onChange={(e) => handleChange(e)}
                        value={content.city}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='postalCode'
                      className='block text-sm font-medium text-gray-700'
                    >
                      ZIP / Postal code
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='postalCode'
                        autoComplete='postalCode'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        // @ts-ignore
                        placeholder={myProfile?.node?.postalCode || ''}
                        disabled={
                          updateProfileState.loading ||
                          createProfileState.loading
                        }
                        onChange={(e) => handleChange(e)}
                        value={content.postalCode}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-6'>
                    <label
                      htmlFor='address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Business address
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='address'
                        autoComplete='address'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        // @ts-ignore
                        placeholder={myProfile?.node?.address || ''}
                        disabled={
                          updateProfileState.loading ||
                          createProfileState.loading
                        }
                        onChange={(e) => handleChange(e)}
                        value={content.address}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='pt-5'>
              <div className='flex justify-end space-x-4'>
                <Link href='/catalog'>
                  <Button variant='light'>Cancel</Button>
                </Link>
                <Link href='/catalog'>
                  <Button onClick={(e) => onSave(e)}>Save</Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
