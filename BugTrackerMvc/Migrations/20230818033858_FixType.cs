using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTrackerMvc.Migrations
{
    /// <inheritdoc />
    public partial class FixType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Labels",
                table: "Issues",
                newName: "Label");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Label",
                table: "Issues",
                newName: "Labels");
        }
    }
}
