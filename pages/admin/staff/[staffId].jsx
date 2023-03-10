import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "../../../components/Image";
import Loading from "../../../components/Loading";

const StaffDetail = ({ staff }) => {
  const [currentStaff, setCurrentStaff] = useState(staff);
  const [postFile, setPostFile] = useState("");
  const router = useRouter();

  //check null staff
  if (!staff) return null;
  //check fallback when generate new staff
  if (router.isFallback) return <Loading />;

  const getFileData = (childData) => {
    setCurrentStaff({
      ...currentStaff,
      image: childData
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff({
      ...currentStaff,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${currentStaff._id}`, currentStaff);
      alert("Create successfully");
      console.log(postFile)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="_id" value={currentStaff._id} readOnly />
        <input type="text" name="email" value={currentStaff.email} onChange={handleChange} />
        <input
          type="text"
          name="full_name"
          value={currentStaff.full_name}
          onChange={handleChange}
        />
        <input type="text" name="role" value={currentStaff.role} onChange={handleChange} />
        <img src={postFile || currentStaff.image} alt="profile_image" style={{ width: "50px" }} />
        <Image getFileData={getFileData} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StaffDetail;

export const getStaticPaths = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`);
  const staffs = await response.data;
  return {
    paths: staffs.map((staff) => ({ params: { staffId: staff._id } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${params.staffId}`
  );
  const staff = await response.data;
  return {
    props: { staff },
    revalidate: 60,
  };
};
