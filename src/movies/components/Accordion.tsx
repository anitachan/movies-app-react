import { ExpandMore } from '@mui/icons-material';
import LaunchIcon from '@mui/icons-material/Launch';
import {
  Accordion as MUIAccordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
  Chip,
  Stack,
  Rating,
} from '@mui/material';
import { MovieDetail } from '../models/movieDetail';

interface Props {
  movie: MovieDetail;
}
export const Accordion = ({ movie }: Props) => {
  return (
    <>
      <MUIAccordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Synopsis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{movie?.overview}</Typography>
        </AccordionDetails>
      </MUIAccordion>
      <MUIAccordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Budget</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>$ {movie?.budget}</Typography>
        </AccordionDetails>
      </MUIAccordion>
      <MUIAccordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Genres</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {movie?.genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              avatar={<Avatar> {genre.name.substring(0, 1)} </Avatar>}
            />
          ))}
        </AccordionDetails>
      </MUIAccordion>
      <MUIAccordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Production Companies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {movie?.production_companies.map((companied) => (
            <Chip
              key={companied.id}
              label={companied.name}
              avatar={<Avatar src={companied.logo_path!} />}
            />
          ))}
        </AccordionDetails>
      </MUIAccordion>
      <MUIAccordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">HomePage</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <a
            href={movie?.homepage}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <LaunchIcon fontSize="small" />
            <Typography>{movie?.homepage}</Typography>
          </a>
        </AccordionDetails>
      </MUIAccordion>
      <MUIAccordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Rating</Typography>
        </AccordionSummary>
        {movie?.vote_average && (
          <AccordionDetails>
            <Stack direction="row" spacing={1} alignItems="center">
              <Rating value={movie?.vote_average} precision={0.1} max={10} readOnly />
              <Typography variant="body2">{movie?.vote_average.toPrecision(2)}</Typography>
            </Stack>
          </AccordionDetails>
        )}
      </MUIAccordion>
    </>
  );
};
