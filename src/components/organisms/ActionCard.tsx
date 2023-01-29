import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React from 'react'
import Avatar from '@mui/material/Avatar';
import { ColorPalette } from '../../style/ColorPalette';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface CarouselCardProps {
  icon: any;
  title: string;
  description: string;
  linkText?: string;
  link?: string;
}

const ActionCard = (props: CarouselCardProps) => {
  return (
    <div style={{
      width: 225,
      height: 225,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
    }}>
      <Card sx={{
        padding: '1rem',
        margin: '0.5rem',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        transition: 'all .3s ease',
        '&:hover': {
          padding: '1.25rem',
          margin: '0.25rem',
          transition: 'all .3s ease-in',
          border: '1px solid',
          borderColor: ColorPalette.FOURTH
        }
      }}
        elevation={2}>
        <CardContent>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Avatar
              sx={{ bgcolor: ColorPalette.FOURTH }}>
              {props.icon}
            </Avatar>
            <div style={{ width: '100%', wordWrap: 'break-word' }}>
              <Typography mt={1.5} component="h4" variant='h6' sx={{ color: ColorPalette.SECONDARY, textAlign: 'center' }}>
                {props.title}
              </Typography>
              <Typography mt={1.5} component="p" variant='body1' sx={{ color: ColorPalette.TERNARY, textAlign: 'center' }}>
                {props.description}
              </Typography>
            </div>
            {
              props.link && props.linkText &&
              <Typography mt={1.5} component="p" variant='body1' sx={{ color: ColorPalette.TERNARY, textAlign: 'center', textDecoration: 'none' }}>
                <Link style={{
                  textDecoration: 'none',
                  color: ColorPalette.PRIMARY
                }} to={props.link} >{props.linkText}</Link>
              </Typography>
            }
          </div>
        </CardContent>
      </Card >
    </div>
  )
}

export default ActionCard;