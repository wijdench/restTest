import { ReactNode } from 'react';
import { AppBar, Toolbar, Container, Typography } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
    },
    appBar: {
      alignItems: 'center',
      backgroundColor: "#098B8C",
    },
    toolbar: theme.mixins.toolbar,
  }),
);


interface LayoutProps {
  children: NonNullable<ReactNode>,
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }: LayoutProps): JSX.Element => {
  const classes = useStyles();
  
    return (
      <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography variant="h6" >
              Bench Test
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
        <div className={classes.toolbar} />
          {children}
        </Container>
      </div>
    );
  }

export default Layout;
