import {
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateUserProfile } from '../services/userApi';

type ProfileUpdateValues = {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
};

export default function ProfileUpdateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileUpdateValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    },
  });

  const onSubmit = (data: ProfileUpdateValues) => {
    mutate(data);
  };

  return (
    <Paper
      sx={{
        p: 5,
        maxWidth: 600,
        mx: 'auto',
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: 'white',
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        mb={3}
        textAlign="center"
        color="var(--dark)"
      >
        Update Profile
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="First Name"
            fullWidth
            {...register('firstName', { required: 'First name is required' })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />

          <TextField
            label="Last Name"
            fullWidth
            {...register('lastName', { required: 'Last name is required' })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />

          <TextField
            label="Username"
            fullWidth
            {...register('userName', { required: 'Username is required' })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />

          <TextField
            label="Email Address"
            fullWidth
            type="email"
            {...register('emailAddress', {
              required: 'Email address is required',
            })}
            error={!!errors.emailAddress}
            helperText={errors.emailAddress?.message}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending}
            sx={{
              bgcolor: 'var(--amber)',
              color: 'white',
              fontWeight: 600,
              py: 1.4,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': { bgcolor: 'var(--golden-yellow)' },
            }}
          >
            {isPending ? 'Updating...' : 'Update Profile'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
