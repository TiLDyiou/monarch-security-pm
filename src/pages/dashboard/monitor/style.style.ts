import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    chartWrapper: {
      width: '100%',
      position: 'relative',
    },
    sectionHeader: {
      fontSize: 14,
      fontWeight: 600,
      color: '#334155',
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    strategicCol: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      minHeight: 180,
    },
    dividerCol: {
      borderLeft: '1px solid #f1f5f9',
      borderRight: '1px solid #f1f5f9',
      padding: '0 24px',
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9',
        padding: '20px 0',
        margin: '16px 0',
      },
    },
  };
});

export default useStyles;
