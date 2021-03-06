import { useState } from 'react';

import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Heading,
  Layer,
  Paragraph,
  ResponsiveContext,
  Select,
  Stack,
  Text,
  TextInput,
} from 'grommet';

import { FormClose } from 'grommet-icons';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      size: '18px',
    },
  },
};

const LOCATIONS = ['Brazil', 'Asia', 'Afghanisatan'];
const TYPES = ['Names', 'Places', 'All'];

function App() {
  const [filteredLocations, setFilteredLocations] = useState(LOCATIONS);

  const [modalShown, setModalShown] = useState(false);

  const [place, setPlace] = useState('');
  const [nameType, setNameType] = useState('');
  const [query, setQuery] = useState('');

  const locationFilterHandler = (text) => {
    const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const exp = new RegExp(escapedText, 'i');
    setFilteredLocations(LOCATIONS.filter((o) => exp.test(o)));
  };

  const searchHandler = () => {
    alert('TODO: Implement Searching');
  };

  const nameTypeReady = place !== '';
  const queryReady = nameTypeReady && nameType !== '';
  const searchReady = queryReady && query !== '';

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill>
            <Box
              tag="header"
              direction="row"
              align="center"
              background="brand"
              pad={{ left: 'medium', right: 'small', vertical: 'small' }}
              elevation="medium"
              style={{ zIndex: '1' }}
            >
              <Heading
                level="3"
                margin="none"
                onClick={() => setModalShown(false)}
              >
                Index Brain
              </Heading>
              <Box direction="row" gap="small">
                <Select
                  value={place}
                  onChange={(o) => setPlace(o.option)}
                  onClose={() => {
                    setFilteredLocations(LOCATIONS);
                  }}
                  onSearch={locationFilterHandler}
                  options={filteredLocations}
                  placeholder="Location"
                />
                <Select
                  value={nameType}
                  onChange={(o) => setNameType(o.option)}
                  options={TYPES}
                  placeholder="Type"
                  disabled={!nameTypeReady}
                />
                <Stack anchor="right" fill>
                  <TextInput
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a search..."
                    disabled={!queryReady}
                  />
                  <Button
                    icon={<FormClose />}
                    onClick={() => setQuery('')}
                    disabled={!queryReady}
                  />
                </Stack>
                <Button
                  label="Search"
                  onClick={searchHandler}
                  disabled={!searchReady}
                />
              </Box>
            </Box>

            <Box flex align="center" justify="center">
              <Paragraph>
                You selected: {nameType} from {place}. Query: '{query}'
              </Paragraph>
            </Box>
            {!modalShown && (
              <Layer>
                <Box>
                  <Box direction="row" justify="end" tag="header" margin="none">
                    <Button
                      icon={<FormClose />}
                      onClick={() => setModalShown(true)}
                    />
                  </Box>
                  <Box
                    pad={{ bottom: 'large', horizontal: 'large' }}
                    gap="small"
                  >
                    <Text>Welcome to IndexBrain!</Text>
                    <Text>FIXME: Add info text about the website here.</Text>
                    <Text>FIXME: Talk about Presentations / Lessons here.</Text>
                    <Text>To get started, select a location:</Text>
                    <Select
                      value={place}
                      onChange={(o) => {
                        setPlace(o.option);
                        setModalShown(true);
                      }}
                      onClose={() => {
                        setFilteredLocations(LOCATIONS);
                      }}
                      onSearch={locationFilterHandler}
                      options={filteredLocations}
                      placeholder="Location"
                    />
                  </Box>
                </Box>
              </Layer>
            )}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
