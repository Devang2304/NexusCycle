import { Link } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export default function ProjectList() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '80%',
          padding: 2, 
          bgcolor: 'background.paper',
        }}
      >
        <List sx={{ width: '100%' }}>
          {["create CI-CD pipeline","Create List", "Create Modal"].map((value) => (
            <ListItem
              key={value} 
              sx={{bgcolor: 'blue',margin:2,padding:2}}
              disableGutters
              secondaryAction={
                <IconButton aria-label="comment">
                  <CommentIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`Line item ${value}`} />
            </ListItem>
            
          ))}
        </List>
          <Button variant="contained"><Link variant="contained" to="/login">Login</Link></Button>
      </Box>
    </Box>
  );
}
