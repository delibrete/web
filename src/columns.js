import { Button } from '@mui/material';
import { formatSize } from './file-utils';

function formatDateString(dateString) {
    let date = new Date(dateString);
    return date.toLocaleString();
}

export default function buildColumns(fileManager, currentAction, onShareClick, onDownloadClick, onDeleteClick) {
    return [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 500,
            editable: true,
        },
        {
            field: 'created_at',
            headerName: 'Created at',
            type: 'date',
            width: 200,
            valueFormatter: (params) => formatDateString(params.value),
        },
        {
            field: 'updated_at',
            headerName: 'Updated at',
            type: 'date',
            width: 200,
            valueFormatter: (params) => formatDateString(params.value),
        },
        {
            field: 'size',
            headerName: 'Size',
            // type: 'number',
            width: 150,
            valueFormatter: (params) => formatSize(params.value),
        },
        {
            field: 'path',
            headerName: 'Path',
            width: 480,
            // hide: path !== null, // Deprecated
        },
        {
            field: 'share',
            headerName: 'Share',
            width: 85,
            style: {
                fontSize: '2rem',
            },
            renderCell: (params) => (
                <div>
                    <Button
                        disabled={currentAction !== "" || params.row.type === "directory"}
                        variant="text"
                        color="primary"
                        onClick={async () => {
                            onShareClick(params);
                        }}
                    >
                        Share
                    </Button>
                </div>
            ),
        },
        {
            field: 'download',
            headerName: 'Download',
            width: 120,
            style: {
                fontSize: '2rem',
            },
            renderCell: (params) => (
                <div>
                    <Button
                        disabled={currentAction !== "" || params.row.type === "directory"}
                        variant="text"
                        color="primary"
                        onClick={async () => {
                            onDownloadClick(params);
                        }}
                    >
                        Download
                    </Button>
                </div>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 85,
            style: {
                fontSize: '2rem',
            },
            renderCell: (params) => (
                <div>
                    <Button
                        disabled={currentAction !== "" || (params.row.type === "directory" &&
                            fileManager.getFile(params.row.path) !== null && Object.keys(fileManager.getChildren(params.row.path)).length > 0)}
                        variant="text"
                        color="error"
                        onClick={async () => {
                            onDeleteClick(params);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        }
    ];
}