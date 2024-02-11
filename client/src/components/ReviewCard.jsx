import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const ReviewCard = ({ title, subheader, content }) => {
  return (
    <div className="rounded-md bg-white transition duration-300 transform hover:shadow-lg hover:border-blue-500 border border-gray-200">
      <Card>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>}
          title={title}
          subheader={subheader}
        />
        
        <CardContent>
          <Typography variant="body2" color="text.secondary" className="text-gray-800">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="border-t border-gray-200">
          <IconButton aria-label="add to favorites" className="text-red-500">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" className="text-blue-500">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default ReviewCard;