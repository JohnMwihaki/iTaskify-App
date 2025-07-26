import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Link,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';
import { loginUser } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import { GitHub, Google, Twitter } from '@mui/icons-material';

type LoginFormValues = {
  identifier: string;
  password: string;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token, user }) => {
      login(token, user);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Login failed');
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', borderRadius: 3, overflow: 'hidden' }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(10px)',
          boxShadow: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, p: 4 }}>
          <Typography
            variant="h5"
            mb={2}
            fontWeight="bold"
            textAlign="center"
            color="var(--dark)"
          >
            Log in to your account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email or Username"
                fullWidth
                {...register('identifier', {
                  required: 'Email or username is required',
                })}
                error={!!errors.identifier}
                helperText={errors.identifier?.message}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isPending}
                sx={{
                  bgcolor: 'var(--amber)',
                  color: '#fff',
                  fontWeight: 600,
                  '&:hover': { bgcolor: 'var(--golden-yellow)' },
                }}
              >
                {isPending ? 'Logging in...' : 'Login'}
              </Button>

              <Typography textAlign="center" mt={1}>
                Don’t have an account?{' '}
                <Link href="/register" underline="hover">
                  Register
                </Link>
              </Typography>
            </Stack>
          </form>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundImage:
            "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('./background1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          px: 6,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box mb={6}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}
          >
            Start organizing your life.
          </Typography>
          <Typography sx={{ opacity: 0.95, maxWidth: '500px', mx: 'auto' }}>
            Manage your tasks effortlessly with Tasky. Your productivity starts here.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ position: 'absolute', bottom: 30 }}
        >
          <IconButton
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              color: 'white',
              '&:hover': { bgcolor: 'var(--golden-yellow)' },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              color: 'white',
              '&:hover': { bgcolor: 'var(--amber)' },
            }}
          >
            <Google />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              color: 'white',
              '&:hover': { bgcolor: 'var(--orange)' },
            }}
          >
            <GitHub />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
