using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeakTogether.Migrations
{
    /// <inheritdoc />
    public partial class addLangLevelToLesson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LangLevel",
                table: "Lessons",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LangLevel",
                table: "Lessons");
        }
    }
}
