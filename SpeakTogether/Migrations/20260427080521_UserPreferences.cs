using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SpeakTogether.Migrations
{
    /// <inheritdoc />
    public partial class UserPreferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLanguage_Users_UserId",
                table: "UserLanguage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLanguage",
                table: "UserLanguage");

            migrationBuilder.RenameTable(
                name: "UserLanguage",
                newName: "UserLanguages");

            migrationBuilder.RenameIndex(
                name: "IX_UserLanguage_UserId_Language",
                table: "UserLanguages",
                newName: "IX_UserLanguages_UserId_Language");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLanguages",
                table: "UserLanguages",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "UserLanguagePreferences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Language = table.Column<int>(type: "integer", nullable: false),
                    MinLevel = table.Column<int>(type: "integer", nullable: false),
                    MaxLevel = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLanguagePreferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserLanguagePreferences_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserLanguagePreferences_UserId",
                table: "UserLanguagePreferences",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLanguages_Users_UserId",
                table: "UserLanguages",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLanguages_Users_UserId",
                table: "UserLanguages");

            migrationBuilder.DropTable(
                name: "UserLanguagePreferences");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLanguages",
                table: "UserLanguages");

            migrationBuilder.RenameTable(
                name: "UserLanguages",
                newName: "UserLanguage");

            migrationBuilder.RenameIndex(
                name: "IX_UserLanguages_UserId_Language",
                table: "UserLanguage",
                newName: "IX_UserLanguage_UserId_Language");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLanguage",
                table: "UserLanguage",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLanguage_Users_UserId",
                table: "UserLanguage",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
