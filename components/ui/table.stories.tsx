import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

const meta = { title: "Base/Table" } satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">MRR</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[["Rose", "Active", "$12.4k"], ["Dona", "Beta", "$2.1k"], ["Haze", "Side", "—"]].map((r) => (
          <TableRow key={r[0]}>
            <TableCell className="font-medium">{r[0]}</TableCell>
            <TableCell>{r[1]}</TableCell>
            <TableCell className="text-right tabular-nums">{r[2]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
