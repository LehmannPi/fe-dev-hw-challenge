import * as Drawer from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Lead } from '../../types/leads';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../ui/select';

type Props = {
  lead: Lead | null;
  onClose: () => void;
  onSave: (updated: Lead) => void;
  onConvert: (lead: Lead) => void;
};

export default function LeadDetailDrawer({
  lead,
  onClose,
  onSave,
  onConvert,
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('New');

  useEffect(() => {
    if (lead) {
      setEmail(lead.email);
      setStatus(lead.status);
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = () => {
    // Basic email validation
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(email)) {
      alert('Invalid email format');
      return;
    }
    onSave({ ...lead, email, status });
    onClose();
  };

  return (
    <Drawer.Root open={!!lead} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[350px] flex"
          style={
            {
              '--initial-transform': 'calc(100% + 8px)',
            } as React.CSSProperties
          }
        >
          <div className="bg-zinc-50 dark:bg-[#161615] h-full w-full grow p-6 flex flex-col rounded-[16px] relative gap-2">
            <Drawer.Close asChild>
              <X
                className="absolute right-4 top-4 cursor-pointer"
                height={28}
              />
            </Drawer.Close>

            <Drawer.Title className="font-medium mb-2 text-zinc-900 dark:text-white break-all mr-8">
              {lead.name}
            </Drawer.Title>
            <Drawer.Description className="text-zinc-600 dark:text-gray-400 mb-4">
              {lead.company}
            </Drawer.Description>

            <div className="space-y-4 flex-1 overflow-y-auto gap-2 flex flex-col">
              <div>
                <Label className="block text-sm font-medium mb-1">Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium mb-1">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Unqualified">Unqualified</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-md font-medium mb-1">Source</Label>
                <p className="text-md">{lead.source}</p>
              </div>

              <div>
                <Label className="block text-md font-medium mb-1">Score</Label>
                <p className="text-md">{lead.score}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-2">
              <Button
                className="cursor-pointer"
                variant={'outline'}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                className="cursor-pointer"
                variant={'ghost'}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                variant={'default'}
                onClick={() => onConvert(lead)}
              >
                Convert
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
