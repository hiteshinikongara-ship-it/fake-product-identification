const Product = artifacts.require("Product");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();

    const manufacturer = accounts[0];
    const seller = accounts[1];
    const buyer = accounts[2];

    const product = await Product.deployed();

    console.log("===============================================");
    console.log(" 🚀 ADDING PRODUCTS BY MANUFACTURER");
    console.log("===============================================");

    await product.addProduct(
      "SN1001",
      "Laptop",
      "Dell",
      web3.utils.toWei("0.06", "ether"),
      { from: manufacturer }
    );

    await product.addProduct(
      "SN1002",
      "Mobile",
      "Samsung",
      web3.utils.toWei("0.02", "ether"),
      { from: manufacturer }
    );

    console.log("✔ Products added");

    // 🔍 CHECK INITIAL STATE
    console.log("\n📦 INITIAL PRODUCTS STATE:");
    console.log(await product.products(1));
    console.log(await product.products(2));

    console.log("\n===============================================");
    console.log(" MANUFACTURER → SELLER");
    console.log("===============================================");

    await product.transferToSeller(1, seller, { from: manufacturer });
    await product.transferToSeller(2, seller, { from: manufacturer });

    console.log("✔ Transfer completed");

    // 🔍 AFTER TRANSFER
    console.log("\n🔄 AFTER TRANSFER STATE:");
    console.log(await product.products(1));
    console.log(await product.products(2));

    console.log("\n===============================================");
    console.log(" SELLER PUTS PRODUCT FOR SALE");
    console.log("===============================================");

    await product.putForSale(
      1,
      web3.utils.toWei("0.06", "ether"),
      { from: seller }
    );

    console.log("✔ Product put for sale");

    // 🔍 AFTER SALE LISTING
    console.log("\n🏷️ FOR SALE STATE:");
    console.log(await product.products(1));

    console.log("\n===============================================");
    console.log(" BUYER PURCHASES PRODUCT");
    console.log("===============================================");

    await product.buyProduct(1, {
      from: buyer,
      value: web3.utils.toWei("0.06", "ether"),
    });

    console.log("🎉 Product purchased");

    // 🔍 FINAL STATE
    console.log("\n🏁 FINAL PRODUCT STATE:");
    console.log(await product.products(1));
    console.log(await product.products(2));

    console.log("\n===============================================");
    console.log(" 🎉 FULL FLOW COMPLETED SUCCESSFULLY");
    console.log("===============================================");

    callback();
  } catch (error) {
    console.error("❌ ERROR OCCURRED:", error);
    callback(error);
  }
};