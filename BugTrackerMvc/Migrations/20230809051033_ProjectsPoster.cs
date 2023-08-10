using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTrackerMvc.Migrations
{
    /// <inheritdoc />
    public partial class ProjectsPoster : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Poster",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Poster",
                table: "Projects");
        }
    }
}
