import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import GroupCard from "./GroupCard";
import PlayoffBracket from "./PlayOffBracket";
import _ from "lodash";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Shuffle } from "lucide-react";

// Tournament data structure
const initialTournamentData = {
  "beginner-mens": {
    players: Array.from({ length: 22 }, (_, i) => ({
      id: `bm-${i + 1}`,
      name: `Beginner ${i + 1}`,
    })),
  },
  "intermediate-mens": {
    players: Array.from({ length: 16 }, (_, i) => ({
      id: `im-${i + 1}`,
      name: `Intermediate ${i + 1}`,
    })),
  },
  "advanced-mens": {
    players: Array.from({ length: 16 }, (_, i) => ({
      id: `am-${i + 1}`,
      name: `Advanced ${i + 1}`,
    })),
  },
  womens: {
    players: Array.from({ length: 16 }, (_, i) => ({
      id: `w-${i + 1}`,
      name: `Women ${i + 1}`,
    })),
  },
};

const categories = [
  {
    id: "beginner-mens",
    title: "Men's Singles - Beginner",
    description: "For players new to competitive table tennis",
  },
  {
    id: "intermediate-mens",
    title: "Men's Singles - Intermediate",
    description: "For players with some competitive experience",
  },
  {
    id: "advanced-mens",
    title: "Men's Singles - Advanced",
    description: "For experienced competitive players",
  },
  {
    id: "womens",
    title: "Women's Singles",
    description: "Open category for all skill levels",
  },
];

const TournamentApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingMatch, setEditingMatch] = useState(null);
  const [view, setView] = useState("groups");

  // Helper functions

  const createPlayoffBracket = (groups) => {
    // Get top 2 players from each group
    const qualifiedPlayers = groups.map((group, groupIndex) => {
      // Calculate standings for each group
      const standings = group.players.map(player => ({
        ...player,
        matches: 0,
        wins: 0,
        losses: 0,
        matchesWon: 0,
        matchesLost: 0
      }));

      group.matches.forEach(match => {
        if (match.score) {
          const player1Standing = standings.find(s => s.id === match.player1.id);
          const player2Standing = standings.find(s => s.id === match.player2.id);

          player1Standing.matches += 1;
          player2Standing.matches += 1;

          if (match.score.player1Score > match.score.player2Score) {
            player1Standing.wins += 1;
            player2Standing.losses += 1;
          } else {
            player2Standing.wins += 1;
            player1Standing.losses += 1;
          }

          player1Standing.matchesWon += match.score.player1Score;
          player1Standing.matchesLost += match.score.player2Score;
          player2Standing.matchesWon += match.score.player2Score;
          player2Standing.matchesLost += match.score.player1Score;
        }
      });

      const sortedStandings = _.orderBy(standings, ['wins', 'matchesWon'], ['desc', 'desc']);
      return sortedStandings.slice(0, 2).map((player, rank) => ({
        ...player,
        groupId: String.fromCharCode(65 + groupIndex),
        rank: rank + 1
      }));
    }).flat();

    // Create quarter-final matches
    const quarterFinals = [
      {
        id: 'QF1',
        player1: qualifiedPlayers.find(p => p.groupId === 'A' && p.rank === 1),
        player2: qualifiedPlayers.find(p => p.groupId === 'D' && p.rank === 2),
        score: null,
        round: 'quarter'
      },
      {
        id: 'QF2',
        player1: qualifiedPlayers.find(p => p.groupId === 'B' && p.rank === 1),
        player2: qualifiedPlayers.find(p => p.groupId === 'C' && p.rank === 2),
        score: null,
        round: 'quarter'
      },
      {
        id: 'QF3',
        player1: qualifiedPlayers.find(p => p.groupId === 'C' && p.rank === 1),
        player2: qualifiedPlayers.find(p => p.groupId === 'B' && p.rank === 2),
        score: null,
        round: 'quarter'
      },
      {
        id: 'QF4',
        player1: qualifiedPlayers.find(p => p.groupId === 'D' && p.rank === 1),
        player2: qualifiedPlayers.find(p => p.groupId === 'A' && p.rank === 2),
        score: null,
        round: 'quarter'
      }
    ];

    // Create semi-final placeholders
    const semiFinals = [
      {
        id: 'SF1',
        player1: null,
        player2: null,
        score: null,
        round: 'semi',
        previousMatches: ['QF1', 'QF2']
      },
      {
        id: 'SF2',
        player1: null,
        player2: null,
        score: null,
        round: 'semi',
        previousMatches: ['QF3', 'QF4']
      }
    ];

    // Create final placeholder
    const final = {
      id: 'F1',
      player1: null,
      player2: null,
      score: null,
      round: 'final',
      previousMatches: ['SF1', 'SF2']
    };

    return {
      matches: [...quarterFinals, ...semiFinals, final],
      qualifiedPlayers
    };
  };
  const generateGroupMatches = (players) => {
    const matches = [];
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        matches.push({
          id: `${players[i].id}-${players[j].id}`,
          player1: players[i],
          player2: players[j],
          score: null,
        });
      }
    }
    return matches;
  };

  const calculateStandings = (group) => {
    const standings = group.players.map((player) => ({
      ...player,
      matches: 0,
      wins: 0,
      losses: 0,
      matchesWon: 0,
      matchesLost: 0,
    }));

    group.matches.forEach((match) => {
      if (match.score) {
        const player1Standing = standings.find(
          (s) => s.id === match.player1.id
        );
        const player2Standing = standings.find(
          (s) => s.id === match.player2.id
        );

        player1Standing.matches += 1;
        player2Standing.matches += 1;

        if (match.score.player1Score > match.score.player2Score) {
          player1Standing.wins += 1;
          player2Standing.losses += 1;
        } else {
          player2Standing.wins += 1;
          player1Standing.losses += 1;
        }

        player1Standing.matchesWon += match.score.player1Score;
        player1Standing.matchesLost += match.score.player2Score;
        player2Standing.matchesWon += match.score.player2Score;
        player2Standing.matchesLost += match.score.player1Score;
      }
    });

    return _.orderBy(standings, ["wins"], ["desc"]);
  };

  const [tournamentData, setTournamentData] = useState(() => {
    // Initialize tournament data with groups
    const data = { ...initialTournamentData };
    const minPlayersPerGroup = 3;
    const maxPlayersPerGroup = 4;
    Object.keys(data).forEach((categoryId) => {
      const groups = [];
      let groupSlicingIndex = 0;
      const totalPlayersCurrentGroup = data[categoryId].players.length;
      let numberOfGroups = Math.ceil(totalPlayersCurrentGroup / maxPlayersPerGroup);

      while ((totalPlayersCurrentGroup / numberOfGroups) < minPlayersPerGroup && numberOfGroups > 1) {
        numberOfGroups--;
      }
      const baseGroupSize = Math.floor(totalPlayersCurrentGroup / numberOfGroups);
      const extraPlayers = totalPlayersCurrentGroup % numberOfGroups;
      const groupSizes = Array(numberOfGroups).fill(baseGroupSize).map((size, index) => {
        return index < extraPlayers ? size + 1 : size;
      });
      for (let i = 0; i < data[categoryId].players.length; i += groupSizes[groupSlicingIndex]) {
        const groupPlayers = data[categoryId].players.slice(
          i,
          Math.min(i + groupSizes[groupSlicingIndex], data[categoryId].players.length)
        );
        groups.push({
          players: groupPlayers,
          matches: generateGroupMatches(groupPlayers),
        });
        groupSlicingIndex ++
      }
      data[categoryId].groups = groups;
      data[categoryId].playoffs = null;
    });
    return data;
  });

  // Event handlers
  const handleShuffle = (categoryId) => {
    setTournamentData((prev) => {
      const shuffledPlayers = _.shuffle([...prev[categoryId].players]);
      const newGroups = [];

      for (let i = 0; i < shuffledPlayers.length; i += 4) {
        const groupPlayers = shuffledPlayers.slice(
          i,
          Math.min(i + 4, shuffledPlayers.length)
        );
        newGroups.push({
          players: groupPlayers,
          matches: generateGroupMatches(groupPlayers),
        });
      }

      return {
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          players: shuffledPlayers,
          groups: newGroups,
          playoffs: null,
        },
      };
    });
    setEditingMatch(null);
  };

  const handleSetScore = (groupIndex, matchId, player1Score, player2Score) => {
    setTournamentData((prev) => {
      const newGroups = [...prev[selectedCategory].groups];
      const groupMatches = newGroups[groupIndex].matches;
      const matchIndex = groupMatches.findIndex((m) => m.id === matchId);

      if (matchIndex !== -1) {
        groupMatches[matchIndex] = {
          ...groupMatches[matchIndex],
          score: { player1Score, player2Score },
        };
      }

      return {
        ...prev,
        [selectedCategory]: {
          ...prev[selectedCategory],
          groups: newGroups,
        },
      };
    });
    setEditingMatch(null);
  };

  const handlePlayoffScore = (matchId, player1Score, player2Score) => {
    setTournamentData((prev) => {
      const categoryData = prev[selectedCategory];
      const newPlayoffs = { ...categoryData.playoffs };
      const matchIndex = newPlayoffs.matches.findIndex((m) => m.id === matchId);

      if (matchIndex !== -1) {
        newPlayoffs.matches[matchIndex].score = { player1Score, player2Score };
        const currentMatch = newPlayoffs.matches[matchIndex];
        const winner =
          player1Score > player2Score
            ? currentMatch.player1
            : currentMatch.player2;

        // Update next round matches
        const nextMatch = newPlayoffs.matches.find((m) =>
          m.previousMatches?.includes(matchId)
        );
        if (nextMatch) {
          if (nextMatch.previousMatches[0] === matchId) {
            nextMatch.player1 = winner;
          } else {
            nextMatch.player2 = winner;
          }
        }
      }

      return {
        ...prev,
        [selectedCategory]: {
          ...categoryData,
          playoffs: newPlayoffs,
        },
      };
    });
    setEditingMatch(null);
  };

  const startPlayoffs = () => {
    const categoryData = tournamentData[selectedCategory];
    const playoffs = createPlayoffBracket(categoryData.groups);
    setTournamentData((prev) => ({
      ...prev,
      [selectedCategory]: {
        ...prev[selectedCategory],
        playoffs,
      },
    }));
    setView("playoffs");
  };

  // Rendering methods
  const renderHomePage = () => (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Table Tennis Tournament
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              data={tournamentData[category.id]}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Select a category to view matches and standings</p>
        </div>
      </div>
    </main>
  );

  const renderCategoryView = () => {
    const categoryData = tournamentData[selectedCategory];

    if (view === "playoffs" && categoryData.playoffs) {
      return (
        <PlayoffBracket
          playoffs={categoryData.playoffs}
          onBackToGroups={() => setView("groups")}
          editingMatch={editingMatch}
          onEditMatch={setEditingMatch}
          onSetScore={handlePlayoffScore}
          onCancelEdit={() => setEditingMatch(null)}
        />
      );
    }

    const allMatchesComplete = categoryData.groups.every((group) =>
      group.matches.every((match) => match.score !== null)
    );

    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedCategory(null)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold">
            {categories.find((c) => c.id === selectedCategory)?.title}
          </h1>
          <div className="ml-auto flex gap-2">
            {categoryData.playoffs ? (
              <Button onClick={() => setView("playoffs")}>View Playoffs</Button>
            ) : allMatchesComplete ? (
              <Button onClick={startPlayoffs}>Start Playoffs</Button>
            ) : null}
            <Button
              variant="outline"
              onClick={() => handleShuffle(selectedCategory)}
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Shuffle Groups
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryData.groups.map((group, groupIndex) => (
            <GroupCard
              key={groupIndex}
              group={group}
              groupIndex={groupIndex}
              standings={calculateStandings(group)}
              editingMatch={editingMatch}
              onEditMatch={setEditingMatch}
              onSetScore={(matchId, score1, score2) =>
                handleSetScore(groupIndex, matchId, score1, score2)
              }
              onCancelEdit={() => setEditingMatch(null)}
            />
          ))}
        </div>
      </div>
    );
  };

  return selectedCategory ? renderCategoryView() : renderHomePage();
};

export default TournamentApp;
