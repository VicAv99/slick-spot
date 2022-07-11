import { Text, UnstyledButton } from '@mantine/core';
import React from 'react';

type SideNavListItemProps = {
  label: string;
} & JSX.IntrinsicElements["button"];

export const SideNavListItem = ({ color, ...props }: SideNavListItemProps) => {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Text weight={500} size="md">
        {props.label}
      </Text>
    </UnstyledButton>
  );
};
