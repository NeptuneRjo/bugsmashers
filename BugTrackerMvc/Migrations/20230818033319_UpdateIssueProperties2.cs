using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTrackerMvc.Migrations
{
    /// <inheritdoc />
    public partial class UpdateIssueProperties2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Labels",
                table: "Issues",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Priority",
                table: "Issues",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Issues",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Labels",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Issues");
        }
    }
}
