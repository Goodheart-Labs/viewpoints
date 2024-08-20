"use client";

import { Input } from "@/ui/input";
import { FormField } from "./FormField";
import type { getPollAdminData } from "@/lib/getPollAdminData";
import { DEFAULT_CORE_QUESTION } from "@/lib/copy";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import {
  FiEye,
  FiEyeOff,
  FiFlag,
  FiGlobe,
  FiLink,
  FiLoader,
  FiLock,
  FiTrash,
} from "react-icons/fi";
import { usePendingAction } from "@/lib/usePendingAction";
import {
  changePollVisibility,
  deleteStatement,
  removeAllFlagsFromStatement,
  toggleStatementVisibility,
} from "@/lib/actions";
import { toast } from "sonner";
import { Switch } from "@/ui/switch";
import { toggleNewStatementsVisibility } from "@/lib/actions";
import { Button } from "@/ui/button";
import { Tooltip, TooltipContent, TooltipProvider } from "@/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/ui/cn";
import ConfirmDialog from "./ConfirmDialog";
import { format } from "date-fns";
import { FiAlertTriangle } from "react-icons/fi";

export function EditPollForm({
  poll,
  statements,
  flaggedStatements,
}: Awaited<ReturnType<typeof getPollAdminData>>) {
  console.log({ statements, flaggedStatements });
  return (
    <TooltipProvider delayDuration={0}>
      <div className="bg-white p-4 rounded-xl border grid gap-8 shadow-sm">
        <FormField title="Title">
          <Input value={poll.title} disabled />
        </FormField>
        <FormField title="Question">
          <Input value={poll.core_question || DEFAULT_CORE_QUESTION} disabled />
        </FormField>
        <EditVisibility pollId={poll.id} defaultValue={poll.visibility} />
        <EditNewStatementsVisibility
          pollId={poll.id}
          defaultValue={poll.new_statements_visible_by_default || false}
        />
        <FormField title="Statements">
          <div className="grid gap-2">
            {statements.map((s) => (
              <Statement
                key={s.id}
                statement={s}
                flags={flaggedStatements[s.id]}
                pollId={poll.id}
              />
            ))}
          </div>
        </FormField>
      </div>
    </TooltipProvider>
  );
}

function EditVisibility({
  pollId,
  defaultValue,
}: {
  pollId: number;
  defaultValue: string;
}) {
  const [loading, handler] = usePendingAction(changePollVisibility, () => {
    toast.success("Poll visibility updated");
  });
  const handleVisibilityChange = (value: "public" | "hidden" | "private") => {
    handler({ pollId, visibility: value });
  };
  return (
    <FormField
      title="Visibility"
      description="Who can see the poll?"
      loading={loading}
    >
      <RadioGroup
        defaultValue={defaultValue}
        onValueChange={handleVisibilityChange}
        className="text-sm"
        disabled={loading}
      >
        <div className="flex items-center">
          <RadioGroupItem value="public" id="public" />
          <label htmlFor="public" className="flex items-center ml-2">
            <FiGlobe className="mr-1" /> Public
          </label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="hidden" id="private-link" />
          <label htmlFor="private-link" className="flex items-center ml-2">
            <FiLink className="mr-1" /> Private Link
          </label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="private" id="closed" />
          <label htmlFor="closed" className="flex items-center ml-2">
            <FiLock className="mr-1" /> Closed
          </label>
        </div>
      </RadioGroup>
    </FormField>
  );
}

function EditNewStatementsVisibility({
  pollId,
  defaultValue,
}: {
  pollId: number;
  defaultValue: boolean;
}) {
  const [loading, handler] = usePendingAction(
    toggleNewStatementsVisibility,
    () => {
      toast.success("New statements visibility updated");
    }
  );

  const handleVisibilityChange = (checked: boolean) => {
    handler({ pollId, visible: checked });
  };

  return (
    <FormField
      title="New Statements Visibility"
      description="Should statements by response to the poll be visible by default?"
      loading={loading}
    >
      <div className="flex items-center">
        <Switch
          checked={defaultValue}
          onCheckedChange={handleVisibilityChange}
          disabled={loading}
        />
        <span className="ml-2 text-sm">
          {defaultValue ? "Initially visible" : "Initially hidden"}
        </span>
      </div>
    </FormField>
  );
}

function Statement({
  statement,
  flags,
  pollId,
}: {
  statement: Awaited<ReturnType<typeof getPollAdminData>>["statements"][number];
  flags?: Awaited<
    ReturnType<typeof getPollAdminData>
  >["flaggedStatements"][number];
  pollId: number;
}) {
  const [visLoading, visHandler] = usePendingAction(
    toggleStatementVisibility,
    () => {
      toast.success("Statement visibility updated");
    }
  );
  const [deleteLoading, deleteHandler] = usePendingAction(
    deleteStatement,
    () => {
      toast.success("Statement deleted");
    }
  );

  return (
    <div
      className={cn("border rounded-lg overflow-hidden", {
        "border-dashed": !statement.visible,
      })}
    >
      <div className="flex gap-2 p-2 items-center">
        <span
          className={cn("flex-grow px-2", {
            "opacity-50": !statement.visible,
          })}
        >
          {!statement.visible ? "(hidden) " : ""}
          {statement.text}
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                visHandler({
                  pollId,
                  statementId: statement.id,
                  visible: !statement.visible,
                })
              }
            >
              {visLoading ? (
                <FiLoader className="animate-spin" />
              ) : statement.visible ? (
                <FiEye />
              ) : (
                <FiEyeOff />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {statement.visible ? "Hide" : "Show"} Statement
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <ConfirmDialog
            icon={FiTrash}
            title="Delete Statement"
            description="Are you sure you want to delete this statement? This action cannot be undone."
            action={
              <Button
                variant="destructive"
                disabled={deleteLoading}
                onClick={() =>
                  deleteHandler({ pollId, statementId: statement.id })
                }
              >
                Delete
              </Button>
            }
          >
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline">
                <FiTrash />
              </Button>
            </TooltipTrigger>
          </ConfirmDialog>
          <TooltipContent>Delete Statement</TooltipContent>
        </Tooltip>
      </div>
      {flags && flags.length > 0 ? (
        <Flags
          flags={flags}
          visible={statement.visible}
          pollId={pollId}
          statementId={statement.id}
        />
      ) : null}
    </div>
  );
}

function Flags({
  flags,
  visible,
  pollId,
  statementId,
}: {
  flags: Awaited<
    ReturnType<typeof getPollAdminData>
  >["flaggedStatements"][number];
  visible: boolean | null;
  pollId: number;
  statementId: number;
}) {
  const [removeAllLoading, removeAllHandler] = usePendingAction(
    removeAllFlagsFromStatement,
    () => {
      toast.success("All flags removed");
    }
  );
  return (
    <div
      className={cn("border-t p-2 bg-neutral-50 text-sm", {
        "border-dashed": !visible,
      })}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <FiFlag />
          <span className="font-semibold">Flags ({flags.length})</span>
        </div>
        <ConfirmDialog
          icon={FiTrash}
          title="Remove all flags"
          description="Are you sure you want to remove all flags from this statement? This action cannot be undone."
          action={
            <Button
              variant="destructive"
              disabled={removeAllLoading}
              onClick={() => removeAllHandler({ pollId, statementId })}
            >
              Remove all flags
            </Button>
          }
        >
          <button className="text-neutral-500 hover:text-neutral-700 text-sm">
            Remove all flags
          </button>
        </ConfirmDialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {flags.map((flag) => (
          <Flag key={flag.id} {...flag} />
        ))}
      </div>
    </div>
  );
}

function Flag({
  description,
  created_at,
  reason,
}: Awaited<
  ReturnType<typeof getPollAdminData>
>["flaggedStatements"][number][number]) {
  return (
    <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <FiAlertTriangle className="text-red-500" />
        <span>{reason}</span>
      </div>
      <p className="text-xs mb-2">{description}</p>
      <p className="text-xs text-gray-500">
        Flagged on {format(new Date(created_at), "MMM d, yyyy")}
      </p>
    </div>
  );
}
