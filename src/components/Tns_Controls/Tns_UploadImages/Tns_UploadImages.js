import React, { useEffect, useState } from 'react';
import { Upload, Modal } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';

const Tns_UploadImages = ({ className, multiple, sources, disabled, onChange }) => {
    const [fileLists, setFileLists] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (!!sources && sources.length > 0) {
            setFileLists(sources);
        }
    }, [sources]);

    const onChangeScreen = ({ fileList }) => {
        onChange(fileList);
        setFileLists(fileList);
    };

    const onPreview = async file => {
        setPreviewVisible(true);
        setImagePreview(file.url || file.thumbUrl);
    };

    const onRemoveFile = file => {
        const index = fileLists.indexOf(file);
        const newFileList = fileLists.slice();
        newFileList.splice(index, 1);
        setFileLists(newFileList);
    };

    const onBeforeUploadFile = file => {
        const files = [];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            file.thumbUrl = e.target.result;
            file.status = 'new';
            file._id = null;
            files.push(file);
            setFileLists([...fileLists, ...files]);
        };
        return false;
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className='ant-upload-text'>Upload</div>
        </div>
    );

    return (
        <div className={`${className}`}>
            <Upload multiple={multiple ? multiple : false}
                listType='picture-card'
                fileList={fileLists}
                beforeUpload={onBeforeUploadFile}
                onRemove={onRemoveFile}
                onPreview={onPreview}
                onChange={onChangeScreen}
                disabled={disabled ? disabled : false}
            >
                {multiple === true || (typeof fileLists === 'object') && fileLists.length === 0 ? uploadButton : null}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
                <img alt='Image Preview' style={{ width: '100%' }} src={imagePreview} />
            </Modal>
        </div>
    );
};

export { Tns_UploadImages };
