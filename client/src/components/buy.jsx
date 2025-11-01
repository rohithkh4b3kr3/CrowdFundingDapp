import { ethers } from "ethers";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Buy({ state }) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { contract } = state;

  const BuyFund = async (e) => {
    e.preventDefault();
    if (!contract) return alert("Contract not loaded!");

    const name = e.target.name.value.trim();
    const message = e.target.message.value.trim();
    if (!name || !message) return alert("Please fill in all fields!");

    try {
      setLoading(true);
      setSuccessMsg("");

      const txn = await contract.fundMe(name, message, {
        value: ethers.parseEther("0.01"),
      });
      await txn.wait();

      setSuccessMsg("✅ Payment of 0.01 ETH successful!");
      console.log("Payment of 0.01 ETH done successfully");
    } catch (err) {
      console.error(err);
      alert("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center px-4 font-mono">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10 text-green-500 drop-shadow-[0_0_15px_#00ff88]"
      >
        Fund the Project
      </motion.h1>

      <motion.form
        onSubmit={BuyFund}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-[#001a0f] to-[#000] p-8 rounded-2xl border border-green-700 shadow-[0_0_30px_#00ff8844] w-full max-w-md flex flex-col gap-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="bg-transparent border border-green-600 text-green-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-800 transition-all duration-200"
        />
        <input
          type="text"
          name="message"
          placeholder="Message"
          className="bg-transparent border border-green-600 text-green-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-800 transition-all duration-200"
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00ff88" }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-black font-bold py-3 rounded-lg mt-3 hover:bg-green-500 active:bg-green-700 transition-all duration-300 shadow-[0_0_15px_#00ff88]"
        >
          {loading ? "⏳ Processing..." : "💸 Pay 0.01 ETH"}
        </motion.button>
      </motion.form>

      {successMsg && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-green-400 drop-shadow-[0_0_10px_#00ff88]"
        >
          {successMsg}
        </motion.p>
      )}
    </div>
  );
}

export default Buy;
