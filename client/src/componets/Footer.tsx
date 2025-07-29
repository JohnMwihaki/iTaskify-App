import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(to right, rgba(22, 7, 43, 0.95), rgba(22, 55, 70, 0.85))",
        color: "var(--smoke-white)",
        pt: 8,
        pb: 4,
        mt: 10,
      }}
    >
      <Container maxWidth="xl">
        
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          
          <Box sx={{ maxWidth: 360 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontFamily: "var(--primary-font)",
                color: "var(--amber)",
              }}
            >
              iTaskify
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--stone-grey)",
                mt: 2,
                lineHeight: 1.8,
              }}
            >
              Your all in one productivity hub. Plan smarter, work better,
              accomplish more all with iTaskify.
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <IconButton href="#" sx={{ color: "var(--amber)" }}>
                <GitHubIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: "var(--amber)" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: "var(--amber)" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" sx={{ color: "var(--amber)" }}>
                <FacebookIcon />
              </IconButton>
            </Stack>
          </Box>

          
          <Box>
            <Typography
              variant="h6"
              sx={{ color: "var(--amber)", mb: 2, fontWeight: 700 }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {["Home", "About", "Features", "Testimony", "Contact"].map(
                (link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="hover"
                    sx={{
                      color: "var(--stone-grey)",
                      fontSize: "0.95rem",
                      "&:hover": { color: "var(--amber)" },
                    }}
                  >
                    {link}
                  </Link>
                )
              )}
            </Stack>
          </Box>

          
          <Box sx={{ minWidth: 300 }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: "1.2rem", mb: 2, color: "var(--amber)" }}
            >
              Stay Updated
            </Typography>
            <Typography sx={{ color: "var(--stone-grey)", mb: 2 }}>
              Subscribe to get our latest updates and features.
            </Typography>
            <Stack direction="row">
              <TextField
                fullWidth
                placeholder="Enter your email"
                InputProps={{
                  sx: {
                    bgcolor: "white",
                    borderRadius: "6px 0 0 6px",
                    "& input": {
                      fontSize: "0.9rem",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "var(--amber)",
                  color: "var(--dark)",
                  px: 3,
                  borderRadius: "0 6px 6px 0",
                  "&:hover": {
                    backgroundColor: "var(--orange)",
                  },
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Box>

    
        <Divider
          sx={{
            my: 5,
            borderColor: "var(--stone-grey)",
            opacity: 0.4,
          }}
        />

        
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="body2"
            sx={{ color: "var(--soft-sand)", fontSize: "0.9rem" }}
          >
            © {new Date().getFullYear()} iTaskify. Built with ❤️ by John Mwihaki.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              href="#"
              sx={{
                color: "var(--soft-sand)",
                fontSize: "0.9rem",
                "&:hover": { color: "var(--amber)" },
              }}
            >
              Privacy
            </Link>
            <Link
              href="#"
              sx={{
                color: "var(--soft-sand)",
                fontSize: "0.9rem",
                "&:hover": { color: "var(--amber)" },
              }}
            >
              Terms
            </Link>
            <Link
              href="#"
              sx={{
                color: "var(--soft-sand)",
                fontSize: "0.9rem",
                "&:hover": { color: "var(--amber)" },
              }}
            >
              FAQ
            </Link>
          </Stack>
          <IconButton
            href="#"
            sx={{
              backgroundColor: "var(--amber)",
              color: "var(--dark)",
              "&:hover": { backgroundColor: "var(--amber)" },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
