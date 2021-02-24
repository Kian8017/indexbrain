import { useState } from "react";
import { Box, Button, Collapsible, Heading, Grommet } from "grommet";
import { Notification } from "grommet-icons";
import HeaderBar from "./element/headerbar.js";

const theme = {
  global: {
    colors: {
      brand: "#228BE6",
    },
    font: {
      size: "18px",
    },
  },
};

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <HeaderBar>
          <Heading level="3" margin="none">
            Index Brain
          </Heading>
          <Button
            icon={<Notification />}
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          />
        </HeaderBar>
        <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
          <Box flex align="center" justify="center">
            App Body
          </Box>
          <Collapsible direction="horizontal" open={showSidebar}>
            <Box
              flex
              width="medium"
              background="light-3"
              elevation="small"
              align="center"
              justify="center"
            >
              Sidebar
            </Box>
          </Collapsible>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
