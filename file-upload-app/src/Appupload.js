import React, { useState } from 'react';
import { uploadData } from '@aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';

function Appupload() {
  const [file, setFile] = useState(null);

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const user = await getCurrentUser();
      await uploadData({
        key: `uploads/${user.username}/${file.name}`,
        data: file,
        options: { contentType: file.type, accessLevel: 'public' },
      });
      alert('PDF uploaded 🎉');
      setFile(null);
    } catch (err) {
      alert('Upload failed ❌');
      console.error(err);
    }
  };

  return (
    <div className="upload-card">
      <input type="file" accept=".pdf" onChange={handleFile} />
      <button className="btn-3d" onClick={handleUpload}>
        Upload PDF
      </button>
    </div>
  );
}

export default Appupload;