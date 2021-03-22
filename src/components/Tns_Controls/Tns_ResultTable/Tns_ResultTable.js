import React, { useState, Fragment } from 'react';
import { Table, Pagination } from 'antd';
import jsonQuery from 'json-query';

import { TNS_METHOD } from '../../../commons';

const Tns_ResultTable = ({ data, columns, component, hiddenSelection, keys, rowKey, className, pagination, style, scrollX, scrollY, currentPage, onPaginationChange, onSizeChange, onSelectedChange }) => {
    const [pageSize, setPageSize] = useState(10);
    const [selectedRowKey, setSelectedRowKey] = useState([]);

    const components = component;
    const column = columns.filter(x => x.className !== 'ant-table-cell-ellipsis-hidden');
    const dataSource = jsonQuery('docs[**]', { data }).value;
    const totalRecord = jsonQuery('totalDocs', { data }).value;
    const Xscroll = !!scrollX ? scrollX : TNS_METHOD.widthColumnCount(column);
    const Yscroll = !!scrollY ? scrollY : undefined;

    const rowSelection = {
        selectedRowKeys: selectedRowKey,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKey(selectedRowKeys);
            onSelectedChange(selectedRows);
        }
    };

    const onPagination = (page, size) => {
        onPaginationChange(page, size);
        if (!hiddenSelection) {
            onSelectedChange([]);
        }
    };

    const onShowSizeChange = (current, size) => {
        setPageSize(size);
        onSizeChange(current, size);
        if (!hiddenSelection) {
            onSelectedChange([]);
        }
    };

    return (
        <Fragment>
            {pagination || pagination === undefined ? (
                <span>
                    <Table bordered
                        rowClassName={() => 'editable-row'}
                        components={components}
                        dataSource={dataSource}
                        columns={column}
                        pagination={false}
                        rowSelection={hiddenSelection ? null : rowSelection}
                        key={keys ? keys : Math.floor(Math.random() * 100)}
                        rowKey={rowKey ? rowKey : '_id'}
                        className={className ? className : ''}
                        style={style ? style : {}}
                        scroll={{ x: Xscroll, y: Yscroll }}
                    />
                    <Pagination key={`pagination${keys}`}
                        showQuickJumper
                        showSizeChanger
                        current={currentPage}
                        total={totalRecord}
                        onChange={onPagination}
                        onShowSizeChange={onShowSizeChange}
                        pageSize={pageSize}
                        pageSizeOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 500, 1000]}
                    />
                </span>
            ) : (
                <Table bordered
                    rowClassName={() => 'editable-row'}
                    components={component}
                    dataSource={dataSource}
                    columns={column}
                    pagination={false}
                    className={className ? className : ''}
                    rowSelection={hiddenSelection ? null : rowSelection}
                    style={style ? style : {}}
                    key={keys ? keys : Math.floor(Math.random() * 100)}
                    rowKey={rowKey ? rowKey : '_id'}
                    scroll={{ x: Xscroll, y: Yscroll }}
                />
            )}
        </Fragment>
    );
};

export { Tns_ResultTable };
