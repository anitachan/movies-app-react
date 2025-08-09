import { Person } from '@mui/icons-material';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, Breadcrumbs as MuiBreadcrumbs, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useLocation } from 'react-router-dom';

const breadcrumbNameMap: Record<
  string,
  { text: string; icon: OverridableComponent<SvgIconTypeMap> }
> = {
  '/home': { text: 'Home', icon: HomeIcon },
  '/favorites': { text: 'Favorites', icon: FavoriteIcon },
  '/details': { text: 'Details', icon: ArtTrackIcon },
  '/actor': { text: 'Actor', icon: Person },
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        color: 'white',
        pl: 2,
        pt: 0.5,
      }}
    >
      <Typography variant="h6" noWrap component="div">
        <Link underline="none" color="inherit">
          Movies
        </Link>
      </Typography>
      {pathNames.map((value, index) => {
        const to = `/${pathNames.slice(0, index + 1).join('/')}`;

        const prevSegment = pathNames[index - 1];
        const isMovieIdSegment = prevSegment === 'details' || prevSegment === 'actor';

        if (isMovieIdSegment) return null;

        const matchKey = Object.keys(breadcrumbNameMap).find((key) => to.startsWith(key));
        const { icon: Icon, text } = breadcrumbNameMap[matchKey ?? ''] ?? {
          icon: HomeIcon,
          text: value,
        };

        return (
          <Typography
            key={to}
            color="white"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <Icon fontSize="small" />
            {text}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
};
