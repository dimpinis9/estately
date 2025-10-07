import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { action, leadIds, data } = await request.json();

    if (!action || !leadIds || !Array.isArray(leadIds)) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let successCount = 0;
    const errors = [];

    switch (action) {
      case "updateStatus":
        if (!data.status) {
          return NextResponse.json(
            { error: "Status is required" },
            { status: 400 }
          );
        }

        // Process each lead individually to avoid TypeScript issues
        for (const leadId of leadIds) {
          try {
            const { error } = await (supabase as any)
              .from("leads")
              .update({ status: data.status })
              .eq("id", leadId)
              .eq("user_id", user.id);

            if (error) {
              errors.push(`Failed to update lead ${leadId}: ${error.message}`);
            } else {
              successCount++;
            }
          } catch (err) {
            errors.push(`Error updating lead ${leadId}: ${err}`);
          }
        }
        break;

      case "delete":
        for (const leadId of leadIds) {
          try {
            const { error } = await supabase
              .from("leads")
              .delete()
              .eq("id", leadId)
              .eq("user_id", user.id);

            if (error) {
              errors.push(`Failed to delete lead ${leadId}: ${error.message}`);
            } else {
              successCount++;
            }
          } catch (err) {
            errors.push(`Error deleting lead ${leadId}: ${err}`);
          }
        }
        break;

      case "addNote":
        if (!data.note) {
          return NextResponse.json(
            { error: "Note is required" },
            { status: 400 }
          );
        }

        for (const leadId of leadIds) {
          try {
            // Get current lead data
            const { data: lead, error: fetchError } = await (supabase as any)
              .from("leads")
              .select("notes")
              .eq("id", leadId)
              .eq("user_id", user.id)
              .single();

            if (fetchError) {
              errors.push(
                `Failed to fetch lead ${leadId}: ${fetchError.message}`
              );
              continue;
            }

            const newNote = `${new Date().toLocaleString()}: ${data.note}`;
            const updatedNotes = lead?.notes
              ? `${lead.notes}\n\n${newNote}`
              : newNote;

            const { error: updateError } = await (supabase as any)
              .from("leads")
              .update({ notes: updatedNotes })
              .eq("id", leadId)
              .eq("user_id", user.id);

            if (updateError) {
              errors.push(
                `Failed to add note to lead ${leadId}: ${updateError.message}`
              );
            } else {
              successCount++;
            }
          } catch (err) {
            errors.push(`Error adding note to lead ${leadId}: ${err}`);
          }
        }
        break;

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({
      message: `Successfully performed ${action} on ${successCount}/${leadIds.length} leads`,
      successCount,
      totalCount: leadIds.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Bulk operation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
