using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeakTogether.Migrations
{
    /// <inheritdoc />
    public partial class AddZoomLinksToLesson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ZoomJoinUrl",
                table: "Lessons",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ZoomStartUrl",
                table: "Lessons",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ZoomJoinUrl",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "ZoomStartUrl",
                table: "Lessons");
        }
    }
}
