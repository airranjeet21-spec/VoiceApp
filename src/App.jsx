

// import React, { useEffect, useRef } from "react";
// import { ZIM } from "zego-zim-web";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// function App() {
//   const zpRef = useRef(null);

//   const userID = "user" + Math.floor(Math.random() * 1000);
//   const userName = "react_" + userID;

//   const appID = 2077445001;
//   const serverSecret = "fedf11b296e864067b5a7ca49f053317"; // testing only

//   const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
//     appID,
//     serverSecret,
//     null,
//     userID,
//     userName
//   );

//   useEffect(() => {
//     const zp = ZegoUIKitPrebuilt.create(TOKEN);
//     zpRef.current = zp;
//     zp.addPlugins({ ZIM });
//   }, [TOKEN]);

//   function invite(callType) {
//     const calleeID = prompt("Enter callee userId");
//     const calleeName = prompt("Enter callee userName");

//     if (!calleeID || !calleeName) return;

//     zpRef.current
//       .sendCallInvitation({
//         callees: [{ userID: calleeID, userName: calleeName }],
//         callType,
//         timeout: 60,
//       })
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   }

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-b from-[#1a2229] to-black flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-[#0d1014] border border-gray-700 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-xl">

//         <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
//           Jkarni App
//         </h1>

//         <div className="text-center text-white text-sm break-all">
//           <p>
//             <span className="text-blue-400 font-medium">User Name:</span>{" "}
//             {userName}
//           </p>
//           <p>
//             <span className="text-blue-400 font-medium">User ID:</span>{" "}
//             {userID}
//           </p>
//         </div>

//         <button
//           onClick={() =>
//             invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)
//           }
//           className="w-[200px] py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
//         >
//           Voice Call
//         </button>

//         <button
//           onClick={() =>
//             invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)
//           }
//           className="w-[200px] py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
//         >
//           Video Call
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function App() {
  const zpRef = useRef(null);

  const userID = "user" + Math.floor(Math.random() * 1000);
  const userName = "react_" + userID;

  const appID = 2077445001;
  const serverSecret = "fedf11b296e864067b5a7ca49f053317"; // ⚠️ testing only

  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    null,
    userID,
    userName
  );

  function initZego() {
    if (zpRef.current) return;

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });
    zpRef.current = zp;
  }

  function invite(callType) {
    initZego(); // 👈 iPhone FIX (user action)

    const calleeID = prompt("Enter callee userId");
    const calleeName = prompt("Enter callee userName");

    if (!calleeID || !calleeName) return;

    zpRef.current
      .sendCallInvitation({
        callees: [{ userID: calleeID, userName: calleeName }],
        callType,
        timeout: 60,
      })
      .catch(console.log);
  }

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl text-center text-white space-y-4">

        <h1 className="text-2xl font-bold">VoiceApp</h1>

        <p>User: {userName}</p>
        <p>ID: {userID}</p>

        <button
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
          className="px-4 py-2 bg-white text-black rounded"
        >
          Voice Call
        </button>

        <button
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
          className="px-4 py-2 bg-white text-black rounded"
        >
          Video Call
        </button>

      </div>
    </div>
  );
}

export default App;

