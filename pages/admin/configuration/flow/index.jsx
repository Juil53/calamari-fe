// import { faArrowLeftLong, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useRouter } from "next/router";
// import axios from "axios";
// import moment from "moment";
// import Link from "next/link";
// import React from "react";
// import FlowStep from "../../../../components/FlowStep";
// import styles from "../../../../styles/Flow.module.scss";

// const ApprovalFlow = ({ flows }) => {
//   const router = useRouter();

//   const handleRevalidation = async () => {
//     await axios.post(
//       `/api/revalidate-page?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN}`,
//       { path: router.pathname }
//     );
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/flow/${id}`);
//       handleRevalidation();
//       alert("Delete Successfully!");
//       router.reload("/admin/configuration/flow");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.header}>
//         <Link href="/admin/configuration">
//           <button className={styles.returnBtn}>
//             <FontAwesomeIcon icon={faArrowLeftLong} />
//           </button>
//         </Link>
//         <Link href="/admin/configuration/create-flow">
//           <button className={styles.createBtn}>
//             <span>
//               <FontAwesomeIcon icon={faPlus} />
//             </span>
//             CREATE FLOW
//           </button>
//         </Link>
//       </div>

//       {flows && (
//         <div className={styles.content}>
//           <div className={styles.leftSide}>
//             {flows.map((flow, index) => (
//               <div key={index} className={styles.flow}>
//                 <Link href={`/admin/configuration/flow/${flow.id}`}>
//                   <div className={styles.editIcon}>
//                     <span>
//                       <FontAwesomeIcon icon={faPenToSquare} />
//                     </span>
//                     <span>Edit</span>
//                   </div>
//                 </Link>
//                 <div className={styles.deleteIcon} onClick={() => handleDelete(flow.id)}>
//                   <span>
//                     <FontAwesomeIcon icon={faPenToSquare} />
//                   </span>
//                   <span>Delete</span>
//                 </div>
//                 <div className={styles.flowDetail}>
//                   <h4>{flow.flowName?.toUpperCase()}</h4>
//                   <span>Created At: {moment(flow.createdAt).format("yyyy-MM-DD")}</span>
//                 </div>
//                 <div className={styles.flowChart}>
//                   <FlowStep flow={flow} />
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className={styles.rightSide}>
//             <h3>Description</h3>
//             <p>
//               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque expedita eum iste sed
//               dolore reiciendis autem porro, sunt nemo voluptatibus.
//             </p>
//             <p>
//               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem quos sed cumque
//               perferendis magnam! Consectetur assumenda quasi aliquid nihil tempora, asperiores
//               laboriosam, sequi deserunt voluptatum iste officia. Ab, beatae consequatur.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApprovalFlow;

// export const getStaticProps = async () => {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/flows`);
//   const flows = res.data;

//   return {
//     props: { flows },
//     revalidate: 360,
//   };
// };
