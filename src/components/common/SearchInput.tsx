import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

type PropsType = {
    name: string
    type: string
}

export const SearchInput: React.FC<PropsType> = ({
    name,type
                              })=> {
    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 600}}
        >
            <SearchIcon/>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search..."
                inputProps={{name,type}}
            />
        </Paper>
    );
}
