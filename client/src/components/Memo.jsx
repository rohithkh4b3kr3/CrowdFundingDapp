import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Memo({ state }) {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const messageMemos = async () => {
      if (contract) {
        const memos = await contract.getMemos();
        setMemos(memos);
        console.log("Fetched memos:", memos);
      }
    };
    messageMemos();
  }, [contract]);

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center py-10 px-4 font-mono">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-8 text-green-500 drop-shadow-[0_0_15px_#00ff88]"
      >
        Transactions
      </motion.h1>

      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-5xl border border-green-700 rounded-xl overflow-hidden shadow-[0_0_25px_#00ff8844]"
      >
        <thead className="bg-gradient-to-r from-green-900 to-black text-green-400 uppercase text-sm">
          <tr>
            <th className="p-3 border-b border-green-800">Name</th>
            <th className="p-3 border-b border-green-800">Message</th>
            <th className="p-3 border-b border-green-800">Time</th>
            <th className="p-3 border-b border-green-800">From</th>
          </tr>
        </thead>
        <tbody>
          {memos.length > 0 ? (
            memos.map((memo, index) => (
              <motion.tr
                key={index}
                whileHover={{ scale: 1.02, backgroundColor: "#0f291e" }}
                transition={{ type: "spring", stiffness: 120 }}
                className="text-green-300 text-sm border-b border-green-800 hover:shadow-[0_0_10px_#00ff8844]"
              >
                <td className="p-3">{memo.name}</td>
                <td className="p-3">{memo.message}</td>
                <td className="p-3 text-green-500">
                  {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
                </td>
                <td className="p-3">{memo.from}</td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center text-gray-500 p-6 italic border-t border-green-900"
              >
                No memos yet — waiting for transactions...
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 text-xs text-green-600"
      >
       
      </motion.div>
    </div>
  );
}

export default Memo;
