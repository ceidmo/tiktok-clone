import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: ${({ theme }) => theme.bgPrimary};
`;

const UploadBox = styled.div`
  width: 100%;
  max-width: 500px;
  border: 2px dashed ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const UploadIcon = styled.div`
  font-size: 50px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
`;

const UploadText = styled.p`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSecondary};
`;

const VideoPreview = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const VideoElement = styled.video`
  width: 100%;
  border-radius: 8px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textPrimary};
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bgSecondary};
  color: ${({ theme }) => theme.textPrimary};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bgSecondary};
  color: ${({ theme }) => theme.textPrimary};
  min-height: 100px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.bgSecondary};
    cursor: not-allowed;
  }
`;

const UploadPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [description, setDescription] = useState('');
  const [song, setSong] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('video')) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes('video')) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeVideo = () => {
    setVideoFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('description', description);
    formData.append('song', song);
    formData.append('hashtags', hashtags);

    try {
      await axios.post('/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <UploadContainer>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
        {previewUrl ? (
          <VideoPreview>
            <VideoElement src={previewUrl} controls />
            <RemoveButton onClick={removeVideo}>
              <FaTimes />
            </RemoveButton>
          </VideoPreview>
        ) : (
          <UploadBox
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <UploadIcon>
              <FaCloudUploadAlt />
            </UploadIcon>
            <UploadText>Drag and drop video files to upload</UploadText>
            <UploadText>or click to browse files</UploadText>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*"
              style={{ display: 'none' }}
            />
          </UploadBox>
        )}

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description..."
          />
        </FormGroup>

        <FormGroup>
          <Label>Song</Label>
          <Input
            type="text"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            placeholder="Add a song name..."
          />
        </FormGroup>

        <FormGroup>
          <Label>Hashtags</Label>
          <Input
            type="text"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="Add hashtags separated by commas..."
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={!videoFile || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </SubmitButton>
      </form>
    </UploadContainer>
  );
};

export default UploadPage;