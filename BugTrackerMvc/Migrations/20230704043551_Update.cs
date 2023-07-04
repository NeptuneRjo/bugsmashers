using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTrackerMvc.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "Issues");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MyProperty",
                table: "Issues",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
