import * as TabsPrimitive from '@radix-ui/react-tabs';
import React from 'react';

export type TabsListProps = React.ComponentPropsWithRef<
  typeof TabsPrimitive.List
>;
export type TabsTriggerProps = React.ComponentPropsWithRef<
  typeof TabsPrimitive.Trigger
>;
export type TabsContentProps = React.ComponentPropsWithRef<
  typeof TabsPrimitive.Content
>;
