const Product = artifacts.require("Product");

module.exports = async function (callback) {
  try {
    console.log("===============================================");
    console.log(" 🔍 PRODUCT VERIFICATION");
    console.log("===============================================");

    const serial = process.argv[4];

    if (!serial) {
      console.log("❌ Serial number not provided");
      console.log("Usage: truffle exec verifyProduct.js <SERIAL>");
      return callback();
    }

    console.log("Serial Entered :", serial);
    console.log("-----------------------------------------------");

    const instance = await Product.deployed();

    // ==============================
    // 🚨 FAKE SIMULATION SECTION
    // ==============================
    const fakeSerials = [
      "FAKE-SN999",
      "TEST-FAKE-001"
    ];

    if (fakeSerials.includes(serial)) {
      console.log("❌ PRODUCT IS FAKE (SIMULATED TEST CASE)");
      console.log("Reason : This serial is marked as FAKE for demonstration/testing");
      console.log("===============================================");
      return callback();
    }

    // ==============================
    // 🔎 REAL BLOCKCHAIN CHECK
    // ==============================

    const productId = await instance.getProductIdBySerial(serial);

    if (productId.toNumber() === 0) {
      console.log("❌ PRODUCT IS FAKE");
      console.log("Reason : Serial number not found on blockchain");
      console.log("===============================================");
      return callback();
    }

    // ==============================
    // ✅ PRODUCT FOUND (REAL)
    // ==============================

    const p = await instance.getProduct(productId);

    const statusMap = ["Created", "For Sale", "Sold"];

    console.log("✅ PRODUCT IS REAL");
    console.log("-----------------------------------------------");
    console.log("Product ID    :", p[0].toNumber());
    console.log("Serial        :", p[1]);
    console.log("Name          :", p[2]);
    console.log("Brand         :", p[3]);
    console.log("Price         :", web3.utils.fromWei(p[4].toString(), "ether"), "ETH");
    console.log("Manufacturer  :", p[5]);
    console.log("Current Owner :", p[6]);
    console.log("Status        :", statusMap[p[7]]);

    console.log(
      "Created At    :",
      new Date(p[8].toNumber() * 1000).toLocaleString("en-IN")
    );

    console.log("===============================================");
    console.log(" 🎉 VERIFICATION COMPLETED");
    console.log("===============================================");

    callback();

  } catch (err) {
    console.error("❌ ERROR:", err);
    callback(err);
  }
};