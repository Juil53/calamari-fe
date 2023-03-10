const Image = ({getFileData}) => {

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleChangeFile = async (e) => {
    const selectedFile = e.target.files[0];
    //Convert image to Base64 format
    const base64File = await convertToBase64(selectedFile);
    //Add Image to state
    getFileData(base64File);
  };

  return (
    <div>
      <input type="file" onChange={handleChangeFile} accept=".jpeg, .png, .jpg" />
    </div>
  );
};

export default Image;
