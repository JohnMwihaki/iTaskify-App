import {
  Box,
  Typography,
  TextField,
  IconButton,
  Rating,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { testimonials } from "../Types/testimonies";

export default function LandingPage() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <>
      <Box
        sx={{
          minWidth: "full",
          maxWidth: "100dvw",
          overflow: "hidden",
          height: "100vh",
          backgroundImage: "url(./background1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "cover",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          color: "white",
          position: "relative",
          mx: { xs: "-1.48rem", md: "-3.25rem" },
          my: "-1.98rem",
          p: 0,
        }}
      >
        <Box sx={{ textAlign: "center", zIndex: 2 }}>
          <Typography
            sx={{
              fontFamily: "var(--secondary-font)",
              color: "var(--amber)",
              fontWeight: "bold",
              fontSize: { xs: "3rem", md: "14rem" },
              lineHeight: 1,
              textAlign: "left",
            }}
          >
            MANAGE
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--secondary-font)",
              color: "var(--orange)",
              fontWeight: 900,
              fontSize: { xs: "3rem", md: "8rem" },
              lineHeight: 1,
              textAlign: "left",
              mb: 4,
            }}
          >
            YOUR TASKS
          </Typography>

          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
              p: 3,
              borderRadius: "50px",
              display: "flex",
              alignItems: "flex-start",
              maxWidth: "500px",
              margin: 0,
              backdropFilter: "blur(10px)",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                Join Us Now
              </Typography>
              <TextField
                placeholder="Your email address"
                variant="standard"
                fullWidth
                InputProps={{
                  disableUnderline: false,
                  style: { color: "white" },
                }}
                sx={{
                  input: { color: "white" },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "var(--sdark)",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "secondary.main",
                  },
                }}
              />
            </Box>

            <IconButton
              sx={{
                bgcolor: "secondary.main",
                width: 60,
                height: 60,
                ml: 2,
                borderRadius: "50%",
                transform: "rotate(-30deg)",
              }}
            >
              <ArrowOutwardIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Box>

        <Box
          component="img"
          src="./heroImage.png"
          alt="floating image"
          sx={{
            position: "absolute",
            right: { xs: "5%", md: "1%" },
            top: 0.4,
            bottom: "5px",
            borderRadius: "10px",
            minHeight: "50vh",
            width: { xs: "200px", md: "540px" },
            transform: "rotate(4deg)",
            zIndex: 7,
          }}
        />
      </Box>

      <Box
        id="about"
        sx={{
          px: { xs: 3, md: 10 },
          py: { xs: 6, md: 10 },
          bgcolor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "var(--earth-brown)",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            About Us
          </Typography>
          <Typography sx={{ maxWidth: "700px", color: "var(--sdark)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa iusto
            officiis ducimus autem sapiente voluptate aliquid quibusdam ea
            quisquam magni debitis dolorum nulla ipsum repellat in, aliquam sint
            esse ex.
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="flex-start"
          gap={6}
        >
          <Box flex={1}>
            <Typography
              variant="h6"
              sx={{ fontWeight:600, mb: 2, color: "var(--earth-brown)" }}
            >
              We aim to simplify your productivity.
            </Typography>
            <Typography sx={{ mb: 4, color: "var(--dark)" }}>
              At iTaskify, we are passionate about helping individuals and teams
              manage their tasks efficiently. Our mission is to provide a
              user friendly platform that streamlines task organization and
              enhances productivity for all users.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Mission
                </Typography>
                <Typography sx={{ color: "var(--dark)" }}>
                  To empower users with a seamless task management experience
                  that boosts productivity and clarity.
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Vision
                </Typography>
                <Typography sx={{ color: "var(--dark)" }}>
                  To become the leading platform that redefines how individuals
                  and teams plan, track, and achieve their goals.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box flex={1} textAlign="center">
            <Box
              component="img"
              src="./hero.jpg"
              alt="About Us Illustration"
              sx={{
                maxWidth: "100%",
                borderRadius: 4,
                boxShadow: 3,
                mb: 2,
              }}
            />
            <Typography
              variant="caption"
              sx={{ display: "block", color: "var(--sdark)", fontStyle: "italic" }}
            >
              Empowering people through simplicity.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ py: 8, bgcolor: "background.paper" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mb={5}
          color="var(--earth-brown)"
          sx={{fontFamily:"var(--primary-font)"}}
        >
          What do our customers say about us?
        </Typography>

        <Box sx={{ overflow: "hidden", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              animation: "scroll 40s linear infinite",
              "@keyframes scroll": {
                "0%": { transform: "translateX(0%)" },
                "100%": { transform: "translateX(-50%)" },
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, i) => (
              <Box
                key={i}
                sx={{
                  minWidth: 280,
                  maxWidth: 280,
                  mx: 2,
                  p: 3,
                  bgcolor: "background.default",
                  borderRadius: 2,
                  boxShadow: 2,
                  textAlign: "center",
                }}
              >
                <Avatar
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{ width: 60, height: 60, mx: "auto", mb: 2 }}
                />
                <Typography fontWeight={600} mb={1}>
                  {testimonial.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  {testimonial.comment}
                </Typography>
                <Rating
                  value={testimonial.rating}
                  precision={0.5}
                  readOnly
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
