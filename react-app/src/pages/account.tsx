import { gql, useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useAuth } from '@/lib/auth';

import Button from '@/components/buttons/Button';
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
  const [myProfile, setMyProfile] = useState(null);
  const [content, setContent] = useState(cleanContent);
  const [state] = useAuth();
  const pinataService = new PinataService();
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
    const { id, version } = myProfile.node;
    console.log('content:', content);
    updateProfile({
      variables: { input: { id, content, options: { version } } },
    });
    alert('Profile updated');
  };

  const handleSave = () => {
    console.log('save');
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

  const onSave = (e) => {
    e.preventDefault();
    console.log('content:', content);
    myProfile ? handleUpdate() : handleSave();
  };

  // if (profileQuery.error) {
  //   console.log('profileQuery:', profileQuery);
  //   return <h1>Failed to load profile!</h1>;
  // }

  // if (profileQuery.loading) {
  //   return <h1>Loading profile...</h1>;
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleImage = async (e) => {
    const { name, files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    const cid = await pinataService.uploadImage(data);
    setContent({ ...content, [name]: cid });
  };

  useEffect(() => {
    if (
      !myProfile &&
      profileQuery.data?.profileIndex &&
      profileQuery.data?.viewer
    ) {
      console.log('profileQuery.data:', profileQuery.data);
      setMyProfile(
        profileQuery.data?.profileIndex.edges.filter(
          (a) => a.node.author.id == profileQuery.data?.viewer.id
        )[0]
      );
    }
  }, [profileQuery.data, state.status]);

  useEffect(() => {
    if (myProfile?.node) {
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

                  {/* <div className='sm:col-span-3'>
                  <Dropdown
                    options={['', 'VEHICLES', 'ELECTRONICS', 'CLOTHES']}
                    disabled={
                      updateProfileState.loading || createProfileState.loading
                    }
                    onChange={(e) => handleChange(e)}
                    name='category'
                    value={content.category}
                  ></Dropdown>
                </div> */}

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
                  <div className='sm:col-span-6'>
                    <label
                      // htmlFor='logo'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      Logo
                    </label>
                    <div className='mt-4 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                      <div className='space-y-1 text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <div className='flex text-sm text-gray-600'>
                          <label
                            htmlFor='logo'
                            className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                          >
                            <span>Upload a file</span>
                            <input
                              name='logo'
                              type='file'
                              className=''
                              // className='sr-only'
                              onChange={(e) => handleImage(e)}
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      {content.logo !== '' && (
                        <div>
                          <Image
                            src={`https://ipfs.io/ipfs/${content.logo}`}
                            alt='logo'
                            width='100%'
                            height='100%'
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                  <div className='sm:col-span-6'>
                    <label
                      htmlFor='headerImage'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      Header
                    </label>
                    <div className='mt-4 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                      <div className='space-y-1 text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <div className='flex text-sm text-gray-600'>
                          <label
                            htmlFor='headerImage'
                            className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                          >
                            <span>Upload a file</span>
                            <input
                              name='headerImage'
                              type='file'
                              className=''
                              // className='sr-only'
                              onChange={(e) => handleImage(e)}
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
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
