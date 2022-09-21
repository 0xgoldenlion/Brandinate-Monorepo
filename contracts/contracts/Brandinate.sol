// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "hardhat/console.sol";

contract Brandinate is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    ITablelandTables private _tableland;
    string private _metadataTable;
    uint256 private _metadataTableId;
    string private _tablePrefix = "brandinate";
    string private _externalURL;

    // Our will be pulled from the network
    string private _baseURIString =
        "https://testnet.tableland.network/query?s=";

    constructor(address registry) ERC721("Pixel", "ITM") {
        /*
         * The Tableland address on your current chain
         */
        _tableland = ITablelandTables(registry);

        /*
         * Stores the unique ID for the newly created table.
         */
        _metadataTableId = _tableland.createTable(
            address(this),
            string.concat(
                "CREATE TABLE ",
                _tablePrefix,
                "_",
                Strings.toString(block.chainid),
                " (id int, external_link text, x int, y int);"
            )
        );

        /*
         * Stores the full tablename for the new table.
         * {prefix}_{chainid}_{tableid}
         */
        _metadataTable = string.concat(
            _tablePrefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(_metadataTableId)
        );
    }

    function createMetadataTable(address registry)
        external
        payable
        onlyOwner
        returns (uint256)
    {
        /*
         * registry if the address of the Tableland registry. You can always find those
         * here https://github.com/tablelandnetwork/evm-tableland#currently-supported-chains
         */
        _tableland = ITablelandTables(registry);

        _metadataTableId = _tableland.createTable(
            address(this),
            /*
             *  CREATE TABLE prefix_chainId (
             *    int id,
             *    string name,
             *    string description,
             *    string external_link,
             *    int x,
             *    int y
             *  );
             */
            string.concat(
                "CREATE TABLE ",
                _tablePrefix,
                "_",
                Strings.toString(block.chainid),
                " (id int, external_link text, x int, y int);"
            )
        );

        _metadataTable = string.concat(
            _tablePrefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(_metadataTableId)
        );

        return _metadataTableId;
    }

    function hi() public {
        console.log("hi");
    }

    /*
     * safeMint allows anyone to mint a token in this project.
     * Any time a token is minted, a new row of metadata will be
     * dynamically insterted into the metadata table.
     */
    function safeMint(address to) public returns (uint256) {
        console.log("hi");
        uint256 newItemId = _tokenIds.current();
        console.log(_metadataTableId);
        // _tableland.runSQL(
        //     address(this),
        //     _metadataTableId,
        //     string.concat(
        //         "INSERT INTO ",
        //         _metadataTable,
        //         " (id, external_link, x, y) VALUES (",
        //         Strings.toString(newItemId),
        //         ", '",
        //         _externalURL,
        //         "', 0, 0)"
        //     )
        // );
        _safeMint(to, newItemId, "");
        _tokenIds.increment();
        return newItemId;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURIString;
    }

    /*
     * tokenURI is an example of how to turn a row in your table back into
     * erc721 compliant metadata JSON. here, we do a simple SELECT statement
     * with function that converts the result into json.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );

        string memory base = _baseURI();

        /*
         * SELECT json_object('id',id,'external_link',external_link,'x',x,'y',y)
         *  as meta FROM canvas_5_4 WHERE id=11
         */
        return
            string.concat(
                base,
                "SELECT%20json_object(%27id%27,id,%27external_link%27,external_link,%27x%27,x,%27y%27,y)%20as%20meta%20FROM%20",
                _metadataTable,
                "%20WHERE%20id=",
                Strings.toString(tokenId),
                "&mode=list"
            );
    }

    /*
     * setExternalURL provides an example of how to update a field for every
     * row in an table.
     */
    function setExternalURL(string calldata externalURL) external onlyOwner {
        _externalURL = externalURL;
        _tableland.runSQL(
            address(this),
            _metadataTableId,
            string.concat(
                "update ",
                _metadataTable,
                " set external_link = ",
                externalURL,
                "||'?tokenId='||id", // Turns every row's URL into a URL including get param for tokenId
                ";"
            )
        );
    }

    function metadataURI() public view returns (string memory) {
        string memory base = _baseURI();
        return string.concat(base, "SELECT%20*%20FROM%20", _metadataTable);
    }
}
