// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Product {

    uint256 public productCount;

    enum Status {
        Created,
        ForSale,
        Sold
    }

    struct ProductItem {
        uint256 id;
        string serial;
        string name;
        string brand;
        uint256 price;
        address manufacturer;
        address currentOwner;
        Status status;
        uint256 createdAt;
    }

    mapping(uint256 => ProductItem) public products;
    mapping(string => uint256) private serialToId;
    mapping(string => bool) private serialExists;

    // ================= EVENTS =================

    event ProductAdded(
        uint256 indexed productId,
        string serial,
        uint256 price,
        address indexed manufacturer
    );

    event TransferredToSeller(
        uint256 indexed productId,
        address indexed seller
    );

    event ProductForSale(
        uint256 indexed productId,
        uint256 price
    );

    event ProductPurchased(
        uint256 indexed productId,
        address indexed buyer,
        uint256 price
    );

    // ================= ADD PRODUCT =================

    function addProduct(
        string memory _serial,
        string memory _name,
        string memory _brand,
        uint256 _price
    ) public {

        require(!serialExists[_serial], "Serial already exists");
        require(_price > 0, "Price must be greater than 0");

        productCount++;

        products[productCount] = ProductItem({
            id: productCount,
            serial: _serial,
            name: _name,
            brand: _brand,
            price: _price,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            status: Status.Created,
            createdAt: block.timestamp
        });

        serialToId[_serial] = productCount;
        serialExists[_serial] = true;

        emit ProductAdded(productCount, _serial, _price, msg.sender);
    }

    // ================= TRANSFER TO SELLER =================

    function transferToSeller(uint256 _id, address _seller) public {

        ProductItem storage p = products[_id];

        require(p.id != 0, "Product does not exist");
        require(msg.sender == p.manufacturer, "Only manufacturer");
        require(p.status == Status.Created, "Invalid status");

        p.currentOwner = _seller;

        emit TransferredToSeller(_id, _seller);
    }

    // ================= PUT FOR SALE =================

    function putForSale(uint256 _id, uint256 _price) public {

        ProductItem storage p = products[_id];

        require(p.id != 0, "Product does not exist");
        require(msg.sender == p.currentOwner, "Only owner");
        require(_price > 0, "Invalid price");

        p.price = _price;
        p.status = Status.ForSale;

        emit ProductForSale(_id, _price);
    }

    // ================= BUY PRODUCT =================

    function buyProduct(uint256 _id) public payable {

        ProductItem storage p = products[_id];

        require(p.id != 0, "Product does not exist");
        require(p.status == Status.ForSale, "Not for sale");
        require(msg.value == p.price, "Incorrect amount");

        address seller = p.currentOwner;

        p.currentOwner = msg.sender;
        p.status = Status.Sold;

        (bool sent, ) = payable(seller).call{value: msg.value}("");
        require(sent, "Transfer failed");

        emit ProductPurchased(_id, msg.sender, msg.value);
    }

    // ================= VERIFY (FIXED - NO REVERT) =================

    function getProductIdBySerial(string memory _serial)
        public
        view
        returns (uint256)
    {
        uint256 id = serialToId[_serial];

        // SAFE RETURN (IMPORTANT FIX)
        if (id == 0) {
            return 0;
        }

        return id;
    }

    // ================= GET PRODUCT DETAILS =================

    function getProduct(uint256 _id)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            uint256,
            address,
            address,
            Status,
            uint256
        )
    {
        ProductItem memory p = products[_id];

        require(p.id != 0, "Product does not exist");

        return (
            p.id,
            p.serial,
            p.name,
            p.brand,
            p.price,
            p.manufacturer,
            p.currentOwner,
            p.status,
            p.createdAt
        );
    }
}