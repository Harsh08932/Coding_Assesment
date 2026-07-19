import { Rating, Box} from "@mui/material";

const RatingStar = ({ ratingValue }) => {
  
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* MUI Rating Component */}
      <Rating
        name="api-rating"
        value={ratingValue}
        precision={0.5} 
        readOnly
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#FFD700", // gold/yellow for filled stars
          },
          "& .MuiRating-iconEmpty": {
            color: "grey-400", // gray for empty stars
          },
        }}
      />
      <p className="text-sm text-gray-600 ml-2">{ratingValue.toFixed(1)}</p>
    </Box>
  );
};

export default RatingStar;
