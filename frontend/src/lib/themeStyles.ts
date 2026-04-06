export const darkTextFieldStyles = {
  '& label': { color: 'rgba(255,255,255,0.5)' },
  '& label.Mui-focused': { color: '#4b6cb7' },
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    borderRadius: 3,
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#4b6cb7' },
  },
  '& .MuiFormHelperText-root': { color: '#f44336' },
};

export const authPaperStyles = {
  padding: { xs: 4, md: 6 },
  borderRadius: 6,
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#fff',
};

export const globalGradientGradient = 'linear-gradient(135deg, #000000 0%, #2c3e50 100%)';
