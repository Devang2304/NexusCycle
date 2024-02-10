import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function SelectAllTransferList() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);
  const [design, setDesign] = React.useState([0, 1, 2, 3]);
  const [development, setDevelopment] = React.useState([4, 5, 6, 7]);
  const [testing, setTesting] = React.useState([8, 9, 10, 11]);
  const [deployed, setDeployed] = React.useState([12, 13, 14, 15]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const designChecked = intersection(checked, design);
  const developmentChecked = intersection(checked, development);
  const testingChecked = intersection(checked, testing);
  const deployedChecked = intersection(checked, deployed);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handledesignChecked = () => {
    setDevelopment(development.concat(designChecked));
    setDesign(not(design, designChecked));
    setChecked(not(checked, designChecked));
  };

  const handledevelopmentChecked = () => {
    setDesign(design.concat(developmentChecked));
    setDevelopment(not(development, developmentChecked));
    setChecked(not(checked, developmentChecked));
  };

  const handledevelopmentChecked1 = () => {
    setTesting(testing.concat(developmentChecked));
    setDevelopment(not(development, developmentChecked));
    setChecked(not(checked, developmentChecked));
  };

  const handletestingChecked = () => {
    setDevelopment(development.concat(testingChecked));
    setTesting(not(testing, testingChecked));
    setChecked(not(checked, testingChecked));
  };

  const handletestingChecked1 = () => {
    setDeployed(deployed.concat(testingChecked));
    setTesting(not(testing, testingChecked));
    setChecked(not(checked, testingChecked));
  };

  const handledeployedChecked = () => {
    setTesting(testing.concat(deployedChecked));
    setDeployed(not(deployed, deployedChecked));
    setChecked(not(deployed, deployedChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  const name = "Project 1";
  const description =
    "This is a project description. It is a very long description that goes on and on.";
  const styles = {
    container: {
      // backgroundColor: '#f4f4f4',
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "100%", // margin: '0 auto',
    },
    name: {
      color: "#333",
      fontSize: "24px",
      marginBottom: "10px",
    },
    description: {
      color: "#666",
      fontSize: "16px",
      lineHeight: "1.6",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.name}>{name}</h2>
        <p style={styles.description}>{description}</p>
      </div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "30px", marginBottom: "30px" }}
      >
        <Grid item>{customList("Design", design)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handledesignChecked}
              disabled={designChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handledevelopmentChecked}
              disabled={developmentChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList("Development", development)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handledevelopmentChecked1}
              disabled={developmentChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handletestingChecked}
              disabled={testingChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList("Testing", testing)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handletestingChecked1}
              disabled={testingChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handledeployedChecked}
              disabled={deployedChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList("Deployment", deployed)}</Grid>
      </Grid>
      <div style={{display: "flex", width: "100%"}}>
        <button className="btn123" id="sign-up-btn" style={{height: "30px", width: "100px", margin: "auto"}}>
          Update
        </button>
      </div>
    </>
  );
}
