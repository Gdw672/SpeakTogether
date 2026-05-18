using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeakTogether.Migrations
{
    /// <inheritdoc />
    public partial class NotificationBoolIntoLessons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "NotificationSent",
                table: "Lessons",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NotificationSent",
                table: "Lessons");
        }
    }
}
