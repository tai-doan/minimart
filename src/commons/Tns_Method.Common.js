import { notification } from 'antd';
import { TNS_NOTICATION_TYPE } from './Tns_Constant.Common';
import moment from 'moment';

const widthColumnCount = array => array.reduce((total, item) => total + item['width'], 0);

const convertCurrency = (value, unit) => {
    if (!!value) {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${!!unit ? unit : 'đ'}`;
    } else {
        return `0${!!unit ? unit : 'đ'}`;
    }
};

const checkAvailableField = (fieldDefault, fieldName) => {
    if (!!fieldDefault) {
        return fieldDefault.includes(fieldName) ? '' : 'hidden';
    }
    return '';
};

const createNotification = (type, message, description) => {
    if (type === TNS_NOTICATION_TYPE.SUCCESS) {
        notification.success({
            message,
            description,
            duration: 1.5,
            placement: 'topRight'
        });
    } else {
        if (type === TNS_NOTICATION_TYPE.ERROR) {
            notification.error({
                message,
                description,
                duration: 1.5,
                placement: 'topRight'
            });
        } else {
            if (type === TNS_NOTICATION_TYPE.INFO) {
                notification.info({
                    message,
                    description,
                    duration: 1.5,
                    placement: 'topRight'
                });
            } else {
                if (type === TNS_NOTICATION_TYPE.WARNING) {
                    notification.warning({
                        message,
                        description,
                        duration: 1.5,
                        placement: 'topRight'
                    });
                } else {
                    if (type === TNS_NOTICATION_TYPE.OPEN) {
                        notification.open({
                            message,
                            description,
                            duration: 1.5,
                            placement: 'topRight'
                        });
                    } else {
                        notification.warn({
                            message,
                            description,
                            duration: 1.5,
                            placement: 'topRight'
                        });
                    }
                }
            }
        }
    }
};

const formatDMY = date => {
    return moment(date).format('DD-MM-YYYY');
};

const formatHMS_DMY = date => {
    return moment(date).format('HH:mm:ss DD-MM-YYYY');
};

const formatHM_DMY = date => {
    return moment(date).format('HH:mm DD-MM-YYYY');
};

const formatHM = date => {
    return moment(date).format('HH:mm')
};

export const TNS_METHOD = {
    widthColumnCount,
    convertCurrency,
    checkAvailableField,
    createNotification,
    formatDMY,
    formatHMS_DMY,
    formatHM_DMY,
    formatHM
};
