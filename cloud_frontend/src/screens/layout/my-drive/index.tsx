import "./style.scss";
import { Grid, IconButton, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContentHeader from '../../../components/content-header';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

const MyDrive = () => {
    return (
        <div>
            <ContentHeader
                title='My Drive'
                viewMode="grid"
                onSelectViewMode={(mode) => console.log(mode)}
            />

            <div className="file-actions">
                <IconButton><CloseIcon /></IconButton>
                <Typography variant="body2">2 Selected</Typography>
                <IconButton className="ml-3"><DownloadIcon /></IconButton>
            </div>

            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                        <div className='file-card'>
                            <div className="header">
                                <InsertDriveFileIcon className="mr-3" fontSize="small" />
                                <div className="title"> nfmsf sd sdffd fdg dfg fdg fdg fd g dg fd gd fg fd gd fgdf gdfg </div>
                            </div>
                            <div className="preview">
                                preview
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                        <div className='file-card'>
                            <div className="header">
                                <InsertDriveFileIcon className="mr-3" fontSize="small" />
                                <div className="title"> nfmsf sd sdffd fdg dfg fdg fdg fd g dg fd gd fg fd gd fgdf gdfg </div>
                            </div>
                            <div className="preview">
                                preview
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                        <div className='file-card'>
                            <div className="header">
                                <InsertDriveFileIcon className="mr-3" fontSize="small" />
                                <div className="title"> nfmsf sd sdffd fdg dfg fdg fdg fd g dg fd gd fg fd gd fgdf gdfg </div>
                            </div>
                            <div className="preview">
                                preview
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                        <div className='file-card'>
                            <div className="header">
                                <InsertDriveFileIcon className="mr-3" fontSize="small" />
                                <div className="title"> nfmsf sd sdffd fdg dfg fdg fdg fd g dg fd gd fg fd gd fgdf gdfg </div>
                            </div>
                            <div className="preview">
                                preview
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default MyDrive