import React, { useState, useRef, useEffect } from 'react';
import styles from './FileUploader.module.css';
import SourceCode from '../../components/source-code/SourceCode';

interface UploadedFile {
    id: string;
    file: File;
    previewUrl?: string;
    uploadProgress: number;
    isUploading: boolean;
    isError: boolean;
    errorMessage?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const FileUploader: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle files selected via input or drag-and-drop
    const handleFilesUpload = (files: FileList) => {
        const newFiles: UploadedFile[] = [];

        Array.from(files).forEach((file) => {
            // Validate file type
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                alert(`File type not allowed: ${file.name}`);
                return;
            }

            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                alert(`File is too large (max 5MB): ${file.name}`);
                return;
            }

            const id = Math.random().toString(36).substring(2, 15);
            const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;

            newFiles.push({
                id,
                file,
                previewUrl,
                uploadProgress: 0,
                isUploading: true,
                isError: false,
            });
        });

        // Add new files to the state
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);

        // Simulate upload for each file
        newFiles.forEach((file) => {
            simulateUpload(file);
        });
    };

    // Simulate file upload with progress and error handling
    const simulateUpload = (uploadedFile: UploadedFile) => {
        let progress = 0;
        const isError = Math.random() < 0.2; // 20% chance of error

        const interval = setInterval(() => {
            if (isError && progress >= 50) {
                clearInterval(interval);
                setUploadedFiles((prevFiles) =>
                    prevFiles.map((file) => {
                        if (file.id === uploadedFile.id) {
                            return { ...file, isUploading: false, isError: true, errorMessage: 'Network error' };
                        }
                        return file;
                    })
                );
                return;
            }

            progress += 10;
            setUploadedFiles((prevFiles) =>
                prevFiles.map((file) => {
                    if (file.id === uploadedFile.id) {
                        return { ...file, uploadProgress: progress };
                    }
                    return file;
                })
            );

            if (progress >= 100) {
                clearInterval(interval);
                setUploadedFiles((prevFiles) =>
                    prevFiles.map((file) => {
                        if (file.id === uploadedFile.id) {
                            return { ...file, isUploading: false };
                        }
                        return file;
                    })
                );
            }
        }, 500);
    };

    // Update total upload progress
    useEffect(() => {
        const totalFiles = uploadedFiles.length;
        const totalUploaded = uploadedFiles.reduce((acc, file) => acc + file.uploadProgress, 0);
        const total = totalFiles * 100;
        const progress = total ? Math.round((totalUploaded / total) * 100) : 0;
        setTotalProgress(progress);
    }, [uploadedFiles]);

    // Drag-and-drop event handlers
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFilesUpload(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Handle file selection via input
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFilesUpload(e.target.files);
        }
    };

    // Remove file from the list
    const removeFile = (id: string) => {
        setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    };

    // Retry uploading a file that failed
    const retryUpload = (fileToRetry: UploadedFile) => {
        setUploadedFiles((prevFiles) =>
            prevFiles.map((file) => {
                if (file.id === fileToRetry.id) {
                    return { ...file, isUploading: true, isError: false, uploadProgress: 0 };
                }
                return file;
            })
        );
        simulateUpload(fileToRetry);
    };

    return (
        <div className={styles.container}>
            <SourceCode link="https://github.com/YourGithubUsername/react-showcase/tree/main/src/showcase/FileUploader" />

            <h1>Drag-and-Drop File Uploader with Preview</h1>

            {/* Drop zone for files */}
            <div
                className={styles.dropZone}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
            >
                <p>Drag and drop files here, or <span style={{color:"#397aff"}}>click</span> to select files</p>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className={styles.fileInput}
                    onChange={handleFileSelect}
                />
            </div>

            {/* Total upload progress bar */}
            {uploadedFiles.length > 0 && (
                <div className={styles.totalProgressBar}>
                    <div className={styles.totalProgress} style={{ width: `${totalProgress}%` }}></div>
                </div>
            )}

            {/* List of uploaded files */}
            <div className={styles.fileList}>
                {uploadedFiles.map((file) => (
                    <div key={file.id} className={styles.fileItem}>
                        {/* File preview */}
                        {file.previewUrl ? (
                            <img src={file.previewUrl} alt={file.file.name} className={styles.imagePreview} />
                        ) : (
                            <div className={styles.fileIcon}>📄</div>
                        )}
                        <div className={styles.fileDetails}>
                            <p className={styles.fileName}>{file.file.name}</p>
                            {/* Display error or upload progress */}
                            {file.isError ? (
                                <p className={styles.errorText}>{file.errorMessage}</p>
                            ) : (
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progress}
                                        style={{ width: `${file.uploadProgress}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>
                        {/* Action buttons */}
                        {file.isUploading ? (
                            <button className={styles.removeButton} onClick={() => removeFile(file.id)}>
                                ✕
                            </button>
                        ) : file.isError ? (
                            <button className={styles.retryButton} onClick={() => retryUpload(file)}>
                                Retry
                            </button>
                        ) : (
                            <button className={styles.removeButton} onClick={() => removeFile(file.id)}>
                                ✔
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUploader;
