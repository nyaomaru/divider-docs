'use client';

import clsx from 'clsx';
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import type {
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from '@/types/ui/components/tabs';

const baseListClass =
  'inline-flex h-10 items-center justify-center rounded-md p-1';

const baseTriggerClass = clsx(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium',
  'ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'hover:text-primary hover:border-primary cursor-pointer border border-zinc-200 dark:border-zinc-950',
  'data-[state=active]:border-black data-[state=active]:text-black dark:data-[state=active]:border-white dark:data-[state=active]:text-white'
);

const baseContentClass = 'mt-2 focus:outline-none';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={clsx(baseListClass, className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    tabIndex={0}
    className={clsx(baseTriggerClass, className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={clsx(baseContentClass, className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
