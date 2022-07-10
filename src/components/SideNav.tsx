import { Navbar, ScrollArea, Title } from '@mantine/core';
import React from 'react';

export const SideNav = () => {
  return (
    <Navbar height="calc(100vh - 100px)" width={{ base: 250 }} p="sm">
      <Navbar.Section mt="xs" className="w-full">
        <Title px="sm" className="whitespace-nowrap" order={2}>
          Slick Spot
        </Title>
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {/* scrollable content here */}
      </Navbar.Section>

      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  );
};
